import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { getDownloadUrl } from "@/firebase/storage";

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export default function ProductCard({ item }) {
  const router = useRouter();

  const [image, setImage] = useState(item.image);

  useEffect(() => {
    getDownloadUrl(item.image).then((url) => {
      setImage(url);
    });
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        router.push(
          `./${item.id}?name=${item.name}&brand=${item.brand}&size=${item.size}&image=${item.image}&description=${item.description}&price=${item.price}`
        );
      }}
      style={styles.item}>
      <View
        style={{
          flexDirection: "column",
          display: "flex",
          width: "100%",
          alignItems: "center",
          borderRadius: 8,
          borderWidth: 2,
          borderColor: "#aaa",
          paddingVertical: 8,
          gap: 0,
        }}>
        <View
          className="flex flex-col rounded-md items-center w-full gap-0 m-0 p-0">
        {image ? (
          <Image
            source={{
              uri: image,
            }}
            style={styles.image}
            className="rounded-md m-0 p-0 mx-auto"
          />
        ) : (
          <Image
            source={require("@/assets/images/placeholder.png")}
            style={styles.image}
            className="rounded-md m-0 p-0 mx-auto"
          />
        )}
        </View>
        <Text style={styles.name} className="text-center">{item.name}</Text>
        <View style={styles.priceAndSizeContainer}>
          <Text style={styles.price} className="text-center">
            {currencyFormatter.format(item.price)}
          </Text>
        </View>
        <Text style={styles.size}>Size: {item.size}</Text>
      </View>
    </TouchableOpacity>
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
  },
  image: {
    backgroundColor: "red",
    borderRadius: 8,
    marginHorizontal:"auto",
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    marginHorizontal: "auto",
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
    alignContent: "center",
    justifyContent: "space-between", // Ensures space between the items
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
  item: {
    flexDirection: "column",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    width: "50%",
  },
  image: {
    width: 100, // Adjust image width and height as needed
    height: 100,
    marginRight: 16, // Add margin for spacing
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  priceAndSizeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    width: "full",
  },
  price: {
    fontSize: 14,
    color: "#666",
  },
  size: {
    fontSize: 14,
    color: "#666",
  },
});
