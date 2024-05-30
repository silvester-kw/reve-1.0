import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: "Home",
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "home" : "home-outline"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bag"
        options={{
          title: "Bag",
          headerTitle: "My Bag",
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "bag" : "bag-outline"} color={color} />,
        }}
      />

      <Tabs.Screen
        name="closet"
        options={{
          title: "Closet",
          headerTitle: "My Closet",
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "star" : "star-outline"} color={color} />,
        }}
      />

      <Tabs.Screen
        name="space"
        options={{
          title: "space",
          headerTitle: "Space",
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "star" : "star-outline"} color={color} />,
        }}
      />
    </Tabs>
  );
}
