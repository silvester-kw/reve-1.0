import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function Page() {
  const { id, name, brand, image, size, description } = useLocalSearchParams();
  return (
    <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
      <View style={{ width: "100%" }}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
        <Text>{name}</Text>
        <Text>{brand}</Text>
        <Text>{size}</Text>
        <Text>{description}</Text>
        <TouchableOpacity style={{ backgroundColor: "#999" }}>
          <Text>Add to Bag</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: "#999", marginTop: 8 }}>
          <Text>Order Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
});
