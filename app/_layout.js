import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import Providers from "./providers";

import { getCollection } from "@/firebase/db";

import { initializeFirebase } from "@/firebase/firebase";
// import { mockData } from "@/data/catalog";
// import { Button } from "react-native-paper";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [firebaseLoaded, connectionCount] = initializeFirebase();

  useEffect(() => {
    if (fontLoaded && firebaseLoaded) {
      SplashScreen.hideAsync();
    }
    console.log("connectionCount", connectionCount);
  }, [fontLoaded, firebaseLoaded]);

  if (!fontLoaded || !firebaseLoaded) {
    return null;
  }

  console.log(getCollection("users"));

  return (
    <Providers>
      {/* <Button onPress={mockData} mode="contained" style={{ margin: 20 }}>
        Mock Data
      </Button> */}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </Providers>
  );
}
