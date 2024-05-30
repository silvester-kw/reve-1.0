import React, { useState } from "react";
import { View, Text, Platform, StatusBar, SafeAreaView, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView } from "react-native";

import Header from "../../components/Header";
import Hero from "@/components/Hero";

const Space = () => {
  const [tab, setTab] = useState("missions");

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.container}>
          <Header title="My Space" />
          <ScrollView>
            <View style={styles.gold}>
              <Image source={{ uri: "@/assets/images/gold.png" }} style={styles.image} />
            </View>
            <View style={styles.tabs}>
              <TouchableOpacity
                style={styles.tab}
                className="bg-black w-fit"
                onPress={() => {
                  setTab("missions");
                }}
              >
                <Text>Missions</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-black w-fit"
                onPress={() => {
                  setTab("perks");
                }}
              >
                <Text>Perks</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-black w-fit"
                onPress={() => {
                  setTab("contributions");
                }}
              >
                <Text>Contributions</Text>
              </TouchableOpacity>
            </View>
            <View>
              {tab == "missions" && (
                <View style={{ height: "60vh" }}>
                  <Image source={{ uri: "@/assets/images/missions.png" }} style={styles.image} />
                </View>
              )}
              {tab == "perks" && (
                <View style={{ height: "60vh" }}>
                  <Image source={{ uri: "@/assets/images/perks.png" }} style={styles.image} />
                </View>
              )}
              {tab == "contributions" && (
                <View style={{ height: "60vh" }}>
                  <Image source={{ uri: "@/assets/images/contributions.png" }} style={styles.image} />
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  tab: {
    flex: 1,
    textAlign: "center",
    padding: "10px 0",
    cursor: "pointer",
    border: "1px solid #ccc",
  },
  tabs: {
    flex: 1,
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "#f1f1f1",
    borderBottom: "1px solid #ccc",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gold: {
    width: "100%",
    height: "150px",
    backgroundColor: "#ff0",
  },
});

export default Space;
