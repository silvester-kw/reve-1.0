import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from "react-native";

const initialItems = [
  {
    id: "1",
    name: "Red Dress",
    brand: "Brand A",
    rentingRange: "$30 - $50",
    status: "Available",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "Blue Jeans",
    brand: "Brand B",
    rentingRange: "$15 - $25",
    status: "Rented",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    name: "White T-Shirt",
    brand: "Brand C",
    rentingRange: "$10 - $20",
    status: "Available",
    image: "https://via.placeholder.com/150",
  },
  // Add more items as needed
];

export default function ClosetScreen() {
  const [items, setItems] = useState(initialItems);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.rentingRange}>Renting Range: {item.rentingRange}</Text>
        <Text style={styles.status}>Status: {item.status}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to Wishlist</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={items} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: "row",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
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
  },
  rentingRange: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  status: {
    fontSize: 14,
    color: item.status === "Available" ? "green" : "red",
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
});
