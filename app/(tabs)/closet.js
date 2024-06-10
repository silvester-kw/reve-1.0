import React, { useState, useEffect } from "react";
import { View, Text, Platform, StatusBar, SafeAreaView, TouchableOpacity, StyleSheet, FlatList, Image } from "react-native";

import Header from "../../components/Header";
import { ClosetData } from "../../data/closet";
import { usePathname, useRouter } from "expo-router";
import { useUser } from "@/hooks/useUser";

import { getPopulatedClosetItemsByUserId } from "@/db/closetItem";
import { getDownloadUrl } from "@/firebase/storage";

const initialItems = [
  {
    id: "1",
    name: "Blue Jeans",
    brand: "Brand B",
    rentStart: "2 Apr 2024",
    rentEnd: "7 Apr 2024",
    status: "Shipment",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "White T-Shirt",
    brand: "Brand C",
    rentStart: "2 Apr 2024",
    rentEnd: "7 Apr 2024",
    status: "Return Now!",
    image: "https://via.placeholder.com/150",
  },
];

const RenderItem = ({ item }) => {
  const { batch, product, status } = item;
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    getDownloadUrl(product.image).then((url) => {
      setImageUrl(url);
    });
  }, []);

  return (
    <View style={styles.item} className="shadow-md overflow-visible m-0 w-full justify-center items-center gap-0">
      {imageUrl ? (
        <Image
          source={{
            uri: imageUrl,
          }}
          style={styles.image}
          className="flex flex-1 rounded-md m-0 p-0 mx-auto max-w-full max-h-full w-full h-full mr-2"
        />
      ) : (
        <Image source={require("@/assets/images/placeholder.png")} style={styles.image} className="flex flex-1 rounded-md m-0 p-0 mx-auto max-w-full max-h-full w-full h-full mr-2" />
      )}
      <View style={styles.details}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.rentingRange}>Renting Range:</Text>
        <Text style={styles.rentingRange}>
          {batch[0].toLocaleDateString()} - {batch[1].toLocaleDateString()}
        </Text>
        <View
          style={[
            styles.button,
            {
              backgroundColor: status === "Return Now!" ? "#B71800" : "black",
            },
          ]}
        >
          <Text style={styles.buttonText}>{status}</Text>
        </View>
      </View>
    </View>
  );
};

export default function Closet() {
  const router = useRouter();
  const pathname = usePathname();

  const [items, setItems] = useState([]);

  const currentDay = new Date();
  const nextMonday = new Date();
  nextMonday.setDate(currentDay.getDate() + ((1 + 7 - currentDay.getDay()) % 7));
  const batchDates = [];
  for (let i = 1; i <= 8; i++) {
    const start = new Date(nextMonday);
    start.setDate(start.getDate() + (i - 1) * 7);
    const end = new Date(nextMonday);
    end.setDate(end.getDate() + i * 7 - 1);
    batchDates.push([start, end]);
  }

  const { user } = useUser();

  useEffect(() => {
    if (pathname === "/closet") {
      if (!user) {
        router.replace("/");
        router.push("/login");
        return;
      }

      getPopulatedClosetItemsByUserId(user.id).then((items) => {
        setItems([])
        setItems(items);
      });
    }
  }, [pathname]);

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.container}>
          <Header title="My Closet" />
          <View className="flex flex-col items-center justify-center p-2 h-full w-full bg-slate-100 overflow-visible">
            {items.length === 0 ? (
              <Text className="text-center text-lg font-bold text-gray-500 mt-4 ">Your closet is empty</Text>
            ) : (
              <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <RenderItem item={item} />}
                className="w-full overflow-visible"
                contentContainerStyle={{
                  gap: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  padding: 8,
                }}
              />
            )}
          </View>
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
  },
  item: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#bbb",
  },
  image: {
    maxWidth: 100,
    width: "100%",
    height: "100%",
    borderWidth: 1.5,
    borderColor: "#ccc",
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  brand: {
    fontSize: 16,
    color: "#888",
    marginBottom: 8,
  },
  rentingRange: {
    fontSize: 14,
    color: "#666",
  },
  status: {
    fontSize: 14,
  },
  button: {
    marginTop: 8,
    backgroundColor: "#28a745",
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    width: "100%",
    height: 60,
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Ensures space between the items
    paddingHorizontal: 10,
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
});
