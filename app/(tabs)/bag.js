import React, { useEffect } from "react";
import { FlatList, View, Text, Image, StyleSheet, SafeAreaView, StatusBar, Platform, TouchableOpacity, ScrollView } from "react-native";
import { Button, Checkbox } from "react-native-paper";
import Header from "@/components/Header";
import { useNavigation, useRouter } from "expo-router";
import { BagData } from "@/data/bag";
import { Skirts } from "@/data/catalog";

import { useUser } from "@/hooks/useUser";

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const ShirtRecommendations = () => {
  const renderSkirts = ({ item }) => (
    <View style={styles.shirtItem}>
      <Image source={item.image} style={styles.shirtImage} />
      <Text style={styles.shirtName}>{item.name}</Text>
      <Text style={styles.shirtPrice}>{currencyFormatter.format(item.price)}</Text>
    </View>
  );

  return <FlatList data={Skirts} renderItem={renderSkirts} keyExtractor={(item) => item.id} horizontal showsHorizontalScrollIndicator={false} style={styles.shirtList} />;
};

export default function Bag() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  const id = "1";
  const name = BagData[0].name;
  const brand = BagData[0].brand;
  const image = BagData[0].image;
  const size = BagData[0].size;
  const description = BagData[0].description;
  const price = BagData[0].price;
  const clothe = { id, name, brand, image, size, description, price };
  const test = true; //ganti dengan data jumlah pembelian / bag

  const batchDates = {};
  batchDates[1] = ["5 May 2024", "11 May 2024"];
  batchDates[2] = ["12 May 2024", "18 May 2024"];
  batchDates[3] = ["19 May 2024", "25 May 2024"];
  batchDates[4] = ["26 May 2024", "1 Jun 2024"];
  batchDates[5] = ["2 Jun 2024", "8 Jun 2024"];
  batchDates[6] = ["9 Jun 2024", "15 Jun 2024"];
  batchDates[7] = ["16 Jun 2024", "22 Jun 2024"];
  batchDates[8] = ["23 Jun 2024", "29 Jun 2024"];

  const renderClothes = ({ item }) => {
    return (
      <View className="flex flex-row pt-1 pb-2 border-[1px] rounded-lg justify-start items-center gap-2 m-0  my-1">
        <Checkbox status="checked" color="#404040" />
        <View className="flex flex-row border-2 rounded-md border-gray-400 w-12 h-16">
          <Image source={item.image} className="max-h-full max-w-full" />
        </View>
        <View className="flex flex-col gap-1">
          <Text className="text-lg font-bold">{item.name}</Text>
          <View className="flex flex-row justify-between">
            <Text className="text-sm">{item.brand}</Text>
            <Text className="text-sm font-bold just">{item.size}</Text>
          </View>
          <Text className="text-sm mr-2">{currencyFormatter.format(item.price)} / Batch</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Header title="Your Bag" />
          <ScrollView className="px-8">
            <View style={styles.row1}>
              <TouchableOpacity style={styles.buttonBlack}>
                <Text style={{ fontWeight: "700", color: "white", fontSize: 12 }}>SELECT ALL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonRed}>
                <Text style={{ fontWeight: "700", color: "white", fontSize: 12 }}>CLEAR ALL</Text>
              </TouchableOpacity>
            </View>
            <FlatList data={BagData} renderItem={renderClothes} keyExtractor={(item) => item.id} scrollEnabled={false} className="w-full overflow-visible mb-8" />
            <View className="flex justify-center border-2 rounded-lg">
              <Text className="font-bold text-lg text-center">Positive Savings</Text>
              {!test && <Text className="text-center">No contribution yet. Let's rent more!</Text>}
              {test && (
                <View>
                  <Text className="text-center">Yay! Look how much you have impact the world!</Text>
                  <View className="flex flex-row px-4 pt-2 justify-center">
                    <View className="flex">
                      <View className="flex flex-row align-item justify-center">
                        <Image source={require("@assets/images/Positive-Savings/Vector.png")} />
                      </View>
                      <Text className="text-center font-bold mt-1">1.5 M</Text>
                      <Text className="text-center font-bold">Textile Waste</Text>
                    </View>
                    <View className="flex  absolute pt-2">
                      <View className="flex  flex-row align-item justify-center">
                        <Image source={require("@assets/images/Positive-Savings/Vector(1).png")} />
                      </View>
                      <Text className="text-center font-bold mt-1">2 L</Text>
                      <Text className="text-center font-bold">Water</Text>
                    </View>
                    <View className="flex ml-28">
                      <View className="flex flex-row  mt-1 align-item justify-center">
                        <Image source={require("@assets/images/Positive-Savings/Vector(2).png")} />
                      </View>
                      <Text className="text-center font-bold mt-2">1 KG</Text>
                      <Text className="text-center font-bold">Carbon Dioxide</Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
            <View>
              <Text className="font-bold text-lg mt-6">Recommendations</Text>
            </View>
            <ShirtRecommendations />
            <View className="flex flex-row justify-between">
              <Text className="font-bold text-lg mt-6">Subtotal</Text>
              <Text className="font-bold text-lg mt-6">Rp 40.000,00</Text>
            </View>
            <Button mode="contained" onPress={() => router.push({ pathname: "/purchase/", params: clothe })} className="mt-4 rounded-md h-12 items-center justify-center" buttonColor="black" labelStyle={{ width: "100%" }} textColor="white">
              Checkout
            </Button>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000", // Match the background color of the header
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    position: "relative",
  },
  buttonRed: { backgroundColor: "#B71800", padding: 8, borderRadius: 5, alignItems: "center" },
  buttonBlack: { backgroundColor: "#000", padding: 8, borderRadius: 5, alignItems: "center" },
  header: {
    width: "100%",
    height: 60,
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Ensures space between the items
    paddingHorizontal: 10,
  },
  test: {
    fontSize: 24,
  },
  columnCatalogue: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  row2: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  box: {
    height: 120,
    width: 163,
    alignItems: "center", //kanan kiri
    justifyContent: "center", //atas bawah
    borderRadius: 10,
    overflow: "hidden",
  },
  box1: {
    backgroundColor: "red",
  },
  box2: {
    backgroundColor: "cyan",
  },
  box3: {
    backgroundColor: "green",
  },
  box4: {
    backgroundColor: "yellow",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center", // Centers the title horizontally within this container
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  profileLogo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  menuText: {
    padding: 10,
    fontSize: 16,
  },
  boxText: {
    fontSize: 25,
    color: "white", // Adjust text color as needed
    fontWeight: "bold",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    zIndex: 1,
    position: "absolute",
  },
  shirtList: {
    marginVertical: 10,
  },
  shirtItem: {
    marginRight: 10,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    padding: 4,
  },
  shirtImage: {
    width: 100,
    height: 100,
  },
  shirtName: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
  shirtPrice: {
    marginTop: 2,
    fontSize: 12,
    color: "#666",
  },
});
