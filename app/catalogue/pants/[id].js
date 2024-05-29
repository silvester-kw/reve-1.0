import { Image, View, Text, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function Page() {
  const { id, name, brand, image, size, description } = useLocalSearchParams();
  return (
    <View style={{ width: "100%", backgroundColor: "#0ff", flex: 1, alignItems: "center" }}>
      <View style={{ width: "100%" }}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
        <Text>{name}</Text>
        <Text>{brand}</Text>
        <Text>{size}</Text>
        <Text>{description}</Text>
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
    width: "100px",
    backgroundColor: "#333",
  },
});
