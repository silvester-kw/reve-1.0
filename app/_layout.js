import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import Providers from "./providers";

import { getCollection } from "@/firebase/db";

import { initializeFirebase } from "@/firebase/firebase";

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
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </Providers>
  );
}
