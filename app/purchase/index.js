import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Text, View, Image } from "react-native";
import { Button, Checkbox } from "react-native-paper";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export default function Purchase() {
  const { user } = useUser();
  const router = useRouter();

  const clothes = [useLocalSearchParams("clothes")];

  const batchDates = {};
  batchDates[1] = ["5 May 2024", "11 May 2024"];
  batchDates[2] = ["12 May 2024", "18 May 2024"];
  batchDates[3] = ["19 May 2024", "25 May 2024"];
  batchDates[4] = ["26 May 2024", "1 Jun 2024"];
  batchDates[5] = ["2 Jun 2024", "8 Jun 2024"];
  batchDates[6] = ["9 Jun 2024", "15 Jun 2024"];
  batchDates[7] = ["16 Jun 2024", "22 Jun 2024"];
  batchDates[8] = ["23 Jun 2024", "29 Jun 2024"];

  console.log(clothes);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  if (!clothes) {
    router.push("/not-found");
    return null;
  }

  const renderClothe = ({ item }) => {
    return (
      <View className="flex flex-row pt-1 pb-2 border-[1.5px] rounded-md border-gray-400 justify-start items-center gap-2 m-0 shadow-sm shadow-black">
        <Checkbox status="checked" color="#404040" />
        <View className="flex flex-row border-2 rounded-md border-gray-400 w-12 h-16">
          <Image source={item.image} className="max-h-full max-w-full" />
        </View>
        <View className="flex flex-col gap-1">
          <Text className="text-lg font-bold">{item.name}</Text>
          <View className="flex flex-row justify-between">
            {/* <Text className="text-sm">{item.brand}</Text> */}
            <Text className="text-sm font-bold">{item.size}</Text>
          </View>
          <Text className="text-sm mr-2">{currencyFormatter.format(item.price)} / Week</Text>
        </View>
      </View>
    );
  };

  return (
    <View className="flex flex-col h-full w-full bg-white p-8 overflow-visible">
      <ScrollView showsVerticalScrollIndicator={false} className="w-full overflow-visible gap-y-4 max-w-full">
        <FlatList data={clothes} renderItem={renderClothe} keyExtractor={(item) => item.id} scrollEnabled={false} className="w-full overflow-visible mb-8" />
        <View className="flex flex-col gap-y-2">
          <Text className="text-lg font-extrabold text-gray-700">payment method</Text>
          <View className="flex flex-row gap-x-2 border-2 m-0 border-neutral-400 rounded-lg px-2 py-3">
            <View className="flex flex-col items-start">
              <Text className="text-lg font-bold">QRIS</Text>
              <Text className="text-sm">+ 0% Charge</Text>
            </View>
          </View>
        </View>
        <View className="flex flex-col gap-y-2">
          <Text className="text-lg font-extrabold text-gray-700 mt-4">Delivery Address</Text>
          <View className="flex flex-col gap-x-2">
            <Text className="text-sm font-bold">
              Rumah <Text className="text-sm text-neutral-500 font-normal">Silvester Adriel Putra Aan</Text>
            </Text>
            <Text className="text-sm font-bold">Jl. Kaliurang KM 5,3</Text>
          </View>
        </View>
        <View className="flex flex-col gap-y-0 ">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-md text-gray-700 mt-4">Subtotal</Text>
            <Text className="text-md text-gray-700 mt-4">{currencyFormatter.format(clothes.reduce((acc, curr) => acc + curr.price, 0))}</Text>
          </View>
          <View className="flex flex-row justify-between items-center">
            <Text className="text-md text-gray-700 mt-4">Delivery Fee</Text>
            <Text className="text-md text-gray-700 mt-4">Rp 0</Text>
          </View>
          <View className="flex flex-row justify-between items-center">
            <Text className="text-md text-gray-700 mt-4">Total</Text>
            <Text className="text-xl font-bold text-gray-700 mt-4">{currencyFormatter.format(clothes.reduce((acc, curr) => acc + curr.price, 0))}</Text>
          </View>
        </View>
        <Button mode="contained" onPress={() => router.push("/purchase/confirmed")} className="mt-4 rounded-md h-12 items-center justify-center" buttonColor="black" labelStyle={{ width: "100%" }} textColor="white">
          Purchase
        </Button>
      </ScrollView>
    </View>
  );
}
