import React, { useState } from "react";
import {
  View,
  Text,
  Platform,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

import Header from "../../components/Header";
import Hero from "@/components/Hero";
import { useRouter } from "expo-router";
import { useUser } from "@/hooks/useUser";

const Space = () => {
  const router = useRouter();

  const { user } = useUser();

  if (!user) {
    router.push("/login");
    return null;
  }

  const [tab, setTab] = useState("missions");

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.container}>
          <Header title="My Space" />
          <ScrollView>
            <View style={styles.gold}>
              <Image
                source={require("@/assets/images/gold.png")}
                style={styles.image}
              />
            </View>
            <View style={styles.tabs}>
              <TouchableOpacity
                style={[styles.tab, tab === "missions" && styles.activeTab]}
                onPress={() => setTab("missions")}>
                <Text style={styles.tabText}>Missions</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, tab === "perks" && styles.activeTab]}
                onPress={() => setTab("perks")}>
                <Text style={styles.tabText}>Perks</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tab,
                  tab === "contributions" && styles.activeTab,
                ]}
                onPress={() => setTab("contributions")}>
                <Text style={styles.tabText}>Contributions</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tabContent}>
              {tab === "missions" && (
                <View style={styles.imageContainer}>
                  <Image
                    source={require("@/assets/images/missions.png")}
                    style={styles.imageMissions}
                  />
                </View>
              )}
              {tab === "perks" && (
                <View style={styles.imageContainer}>
                  <Image
                    source={require("@/assets/images/perks.png")}
                    style={styles.imagePerks}
                  />
                </View>
              )}
              {tab === "contributions" && (
                <View style={styles.imageContainer}>
                  <Image
                    source={require("@/assets/images/contributions.png")}
                    style={styles.imageContributions}
                  />
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
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#000",
  },
  tabText: {
    color: "#000",
    fontWeight: "bold",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "#f1f1f1",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  imageMissions: {
    width: 400,
    height: 500,
    resizeMode: "cover",
  },
  imagePerks: {
    width: 400,
    height: 500,
    resizeMode: "cover",
  },
  imageContributions: {
    width: 400,
    height: 500,
    resizeMode: "cover",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  imageContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  gold: {
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  tabContent: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // padding: 20,
  },
});

export default Space;
