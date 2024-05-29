import { Platform, View, Image, Text, Button, FlatList, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Shirts } from "../../../data/shirts";

const MyFlatList = () => {
  return (
    <FlatList
      data={Shirts}
      renderItem={({ item }) => (
        <View style={[styles.item, { alignItems: "center", margin: 2 }]}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.priceAndSizeContainer}>
            <Text style={styles.price}>Rp{item.price}</Text>
          </View>
          <Text style={styles.size}>Size: {item.size}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
    />
  );
};

export default function Shirt() {
  const router = useRouter();
  return (
    <View style={{ alignItems: "center" }}>
      <MyFlatList />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "column",
    flexWrap: "wrap",
    padding: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 12,
    borderColor: "#000",
    borderBlockColor: "#000",
    borderWidth: 1,
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
