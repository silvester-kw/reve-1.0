import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Modal,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Button, Checkbox } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";

import { getDownloadUrl } from "@/firebase/storage";
import { clearBag, getPopulatedBagItems } from "@/db/user";
import { addClosetItems } from "@/db/closetItem";

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

function RenderClothe({ item }) {
  const product = item.product;
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    getDownloadUrl(product.image).then((url) => {
      setImageUrl(url);
    });
  }, []);

  return (
    <View className="flex flex-row pt-1 pb-2 border-[1.5px] rounded-md border-gray-400 justify-start items-center gap-2 m-0 pl-3 shadow-sm shadow-black w-full">
      <View className="flex flex-row border-2 rounded-md border-gray-400 w-12 h-16">
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} className="max-h-full max-w-full w-full h-full" />
        ) : (
          <Image
            source={require("@/assets/images/placeholder.png")}
            className="max-h-full max-w-full w-full h-full"
          />
        )}
      </View>
      <Image source={{ uri: imageUrl }} className="max-h-full max-w-full" />
      <View className="flex flex-col gap-1">
        <Text className="text-lg font-bold">{product.name}</Text>
        <View className="flex flex-row justify-between">
          {/* <Text className="text-sm">{product.brand}</Text> */}
          <Text className="text-sm font-bold">{product.size}</Text>
        </View>
        <Text className="text-sm mr-2">
          {currencyFormatter.format(product.price)} / Batch
        </Text>
      </View>
    </View>
  );
}

export default function Purchase() {
  const { user } = useUser();
  const router = useRouter();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("QRIS");
  const [clothes, setClothes] = useState([]);

  const currentDay = new Date();
  const nextMonday = new Date();
  nextMonday.setDate(currentDay.getDate() + ((1 + 7 - currentDay.getDay()) % 7));
  const batchDates = []
  for (let i = 1; i <= 8; i++) {
    const start = new Date(nextMonday);
    start.setDate(start.getDate() + (i - 1) * 7);
    const end = new Date(nextMonday);
    end.setDate(end.getDate() + i * 7 - 1);
    batchDates.push([start, end]);
  }

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }

    getPopulatedBagItems(user.id).then((items) => {
      setClothes(items);
    });
  }, []);

  const handlePurchase = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    addClosetItems(user.id, clothes)
      .then(() => {
        clearBag(user.id);
        router.replace("/purchase/confirmed");
      })
      .catch((e) => {
        alert(e.message);
      });
  }

  // if (!clothes) {
  //   router.push("/not-found");
  //   return null;
  // }

  return (
    <View className="flex flex-col h-full w-full bg-white p-8 overflow-visible">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="w-full overflow-visible gap-y-4 max-w-full">
        <FlatList
          data={clothes}
          renderItem={({ item }) => <RenderClothe item={item} />}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          className="w-full overflow-visible mb-8"
          contentContainerStyle={{ gap: 8}}
        />
        <View className="flex flex-col gap-y-2">
          <Text className="text-lg font-extrabold text-gray-700">
            Payment Method
          </Text>
          <View className="flex flex-row gap-x-2 border-2 m-0 border-neutral-400 rounded-lg px-2 py-3">
            <TouchableOpacity
              onPress={() => setIsModalVisible(!isModalVisible)}
              className="flex flex-col items-start w-full">
              <Text className="text-lg font-bold">{paymentMethod}</Text>
              <Text className="text-sm">
                + {paymentMethod == "QRIS" ? 0 : 5}% Charge
              </Text>
            </TouchableOpacity>

            {isModalVisible && (
              <Modal
                isModalVisible={isModalVisible}
                animationType="slide" // aa
                transparent={true}
                className="h-full justify-end animate-slideInUp animate-slideOutDown">
                <View className="w-full h-full justify-end animate-slideInUp animate-slideOutDown">
                  <TouchableOpacity
                    onPress={() => setIsModalVisible(!isModalVisible)}
                    className="h-full"></TouchableOpacity>
                  <View className="w-full bg-slate-200 rounded-t-3xl pt-10 border-2 border-gray-300 space-y-3">
                    <View className="flex flex-row justify-center items-center">
                      <Text className="text-xl font-bold">Payment Method</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => (
                        setPaymentMethod("BNI Virtual Account"),
                        setIsModalVisible(!isModalVisible)
                      )}
                      className="flex flex-row mx-8 border rounded-xl border-gray-400 px-2 py-4">
                      <View className="w-[30%] justify-center items-center">
                        <Image
                          source={require("@/assets/images/bank/bni-logo.png")}
                        />
                      </View>
                      <Text>BNI Virtual Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => (
                        setPaymentMethod("BCA Virtual Account"),
                        setIsModalVisible(!isModalVisible)
                      )}
                      className="flex flex-row mx-8 border rounded-xl border-gray-400 px-2 py-4">
                      <View className="w-[30%] justify-center items-center">
                        <Image
                          source={require("@/assets/images/bank/bca-logo.png")}
                        />
                      </View>
                      <Text>BCA Virtual Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => (
                        setPaymentMethod("BRI Virtual Account"),
                        setIsModalVisible(!isModalVisible)
                      )}
                      className="flex flex-row mx-8 border rounded-xl border-gray-400 px-2 py-4">
                      <View className="w-[30%] justify-center items-center">
                        <Image
                          source={require("@/assets/images/bank/bri-logo.png")}
                        />
                      </View>
                      <Text>BRI Virtual Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => (
                        setPaymentMethod("Mandiri Virtual Account"),
                        setIsModalVisible(!isModalVisible)
                      )}
                      className="flex flex-row mx-8 border rounded-xl border-gray-400 px-2 py-4">
                      <View className="w-[30%] justify-center items-center">
                        <Image
                          source={require("@/assets/images/bank/mandiri-logo.png")}
                        />
                      </View>
                      <Text>Mandiri Virtual Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => (
                        setPaymentMethod("QRIS"),
                        setIsModalVisible(!isModalVisible)
                      )}
                      className="flex flex-row mx-8 border rounded-xl border-gray-400 px-2 py-4">
                      <View className="w-[30%] justify-center items-center">
                        <Image
                          source={require("@/assets/images/bank/qris-logo.png")}
                        />
                      </View>
                      <Text>QRIS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setIsModalVisible(!isModalVisible)}>
                      <Text>TUTUP</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            )}
          </View>
        </View>
        <View className="flex flex-col gap-y-2">
          <Text className="text-lg font-extrabold text-gray-700 mt-4">
            Delivery Address
          </Text>
          <View className="flex flex-col gap-x-2">
            <Text className="text-sm font-bold">
              Rumah{" "}
              <Text className="text-sm text-neutral-500 font-normal">
                Silvester Adriel Putra Aan
              </Text>
            </Text>
            <Text className="text-sm font-bold">Jl. Kaliurang KM 5,3</Text>
          </View>
        </View>
        <View className="flex flex-col gap-y-0 ">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-lg text-gray-500 mt-4">Subtotal</Text>
            <Text className="text-lg text-gray-500 mt-4">
              {currencyFormatter.format(
                clothes.reduce((acc, curr) => acc + curr.product.price, 0)
              )}
            </Text>
          </View>
          <View className="flex flex-row justify-between items-center">
            <Text className="text-lg text-gray-500 mt-2">
              Payment Fee ({paymentMethod == "QRIS" ? 0 : 5}%)
            </Text>
            {paymentMethod == "QRIS" ? (
              <Text className="text-lg text-gray-500 mt-2">
                {currencyFormatter.format(
                  clothes.reduce((acc, curr) => acc + curr.product.price, 0) * 0
                )}
              </Text>
            ) : (
              <Text className="text-lg text-gray-500 mt-2">
                {currencyFormatter.format(
                  clothes.reduce((acc, curr) => acc + curr.product.price, 0) * 0.05
                )}
              </Text>
            )}
          </View>
          <View className="flex flex-row justify-between items-center">
            <Text className="text-lg text-gray-500 mt-2">Deposit (7%)</Text>
            <Text className="text-lg text-gray-500 mt-2">
              {currencyFormatter.format(
                clothes.reduce((acc, curr) => acc + curr.product.price, 0) * 0.07
              )}
            </Text>
          </View>
          <View className="flex flex-row justify-between items-center">
            <Text className="text-lg font-black text-[#BB8A26] mt-2">
              Badge Discount (5%)
            </Text>
            <Text className="text-lg font-black text-[#BB8A26] mt-2">
              -{" "}
              {currencyFormatter.format(
                clothes.reduce((acc, curr) => acc + curr.product.price, 0) * 0.05
              )}
            </Text>
          </View>
          <View className="flex flex-row justify-between items-center">
            <Text className="text-lg text-gray-500 mt-2">Total</Text>
            {paymentMethod == "QRIS" ? (
              <Text className="text-xl font-bold text-gray-500 mt-2">
                {currencyFormatter.format(
                  clothes.reduce((acc, curr) => acc + curr.product.price, 0) * 1.02
                )}
              </Text>
            ) : (
              <Text className="text-xl font-bold text-gray-500 mt-2">
                {currencyFormatter.format(
                  clothes.reduce((acc, curr) => acc + curr.product.price, 0) * 1.07
                )}
              </Text>
            )}
          </View>
        </View>
        <Button
          mode="contained"
          onPress={handlePurchase}
          className="mt-4 rounded-md h-12 items-center justify-center"
          buttonColor="black"
          labelStyle={{ width: "100%" }}
          textColor="white">
          Purchase
        </Button>
      </ScrollView>
    </View>
  );
}
