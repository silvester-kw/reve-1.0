import { useState } from "react";
import { View, Text } from "react-native";

import { useUser } from "@/hooks/useUser";

export default function Login() {
  const user = useUser();

  console.log(user);

  return (
    <View className="bg-gray-100 h-full w-full flex justify-center items-center p-24">
      <Text>{user ? "Welcome back!" : "Please log in"}</Text>
    </View>
  );
}
