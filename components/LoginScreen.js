import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function LoginScreen() {
  return (
    <View>
      <View style={styles.container}>
        <Image source={require("./../assets/images/reve-icon.png")} style={styles.reveImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  reveImage: {
    height: "200px",
    width: "200px",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
  },
});
