import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Hero() {
  return (
    <View style={styles.heroContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.heroText}>Change The Way You Dressed</Text>
        <Text style={styles.heroText2}>Welcome to ReVe, Indonesia’s first diverse and circular fashion rental app</Text>
      </View>
      <Image
        source={require("@/assets/images/herofoto.jpg")} // Use the imported image
        style={styles.fotobesar}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    width: "100%", // Adjust the width of the container as needed
    height: 200, // Adjust the height of the container as needed
    overflow: "hidden", // This will clip the image to the container bounds
  },
  fotobesar: {
    width: "100%",
    height: "100%",
  },
  heroText: {
    fontSize: 15,
    color: "white", // Adjust text color as needed
    fontWeight: "bold",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  textContainer: {
    position: "absolute",
    left: 175,
    paddingRight: 10,
    top: 40,
    zIndex: 1,
  },
  heroText2: {
    fontSize: 13,
    color: "white",
    width: "80%",
    marginTop: 10,
    flexShrink: 1,
  },
});
