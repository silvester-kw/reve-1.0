import React, { useState, useEffect } from "react";
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
import { usePathname, useRouter } from "expo-router";
import { useUser } from "@/hooks/useUser";
import { getWaste } from "@/db/closetItem";

const Space = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [claim, setClaim] = useState(false);
  const [waste, setWaste] = useState({
    textile: 0,
    water: 0,
    trash: 0,
  });

  const { user } = useUser();

  useEffect(() => {
    if (pathname == "/space") {
      if (!user) {
        router.replace("/");
        router.push("/login");
        return;
      }

      getWaste(user.id).then((waste) => {
        setWaste(waste);
      });
    }
  }, [pathname]);

  const [tab, setTab] = useState("missions");

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.container}>
          <Header title="My Space" />
          <ScrollView>
            <View className="w-full px-6 flex flex-row items-center justify-between mb-8">
              <View>
                <Text className="font-black text-[32px] text-[#BB8A26] mt-6">
                  Gold
                </Text>
                <Image
                  source={require("@/assets/images/gold-bar.png")}
                  className="w-[235px] mt-4"
                />
                <Text className="font-regular text-[14px] text-[#646464] mt-2">
                  {claim ? 675 : 700} pts to unlock{" "}
                  <Text className="font-semibold">Platinum</Text>
                </Text>
              </View>
              <View>
                <Image source={require("@/assets/images/gold-medal.png")} />
              </View>
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
                <View className="w-full px-6">
                  {!claim && (
                    <View className="flex flex-row justify-between items-center py-4 border-b-2">
                      <View className="gap-1">
                        <Text className="text-[16px] font-black">
                          Open ReVe app (daily)
                        </Text>
                        <TouchableOpacity onPress={() => setClaim(true)}>
                          <Text className="text-[16px] font-black">
                            (claim now)
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View className="flex flex-row items-center">
                        <Image
                          source={require("@/assets/images/reve-point.png")}
                        />
                        <Text className="ml-2 text-[16px] font-black">
                          25 pts
                        </Text>
                      </View>
                    </View>
                  )}
                  <View className="flex flex-row justify-between items-center py-4 border-b-2">
                    <View className="gap-1">
                      <Text className="text-[16px] font-medium">
                        Open sweater catalogue (daily)
                      </Text>
                      <Text className="text-[16px] font-medium">(0/1)</Text>
                    </View>
                    <View className="flex flex-row items-center">
                      <Image
                        source={require("@/assets/images/reve-point.png")}
                      />
                      <Text className="ml-2 text-[16px] font-medium">
                        25 pts
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-row justify-between items-center py-4 border-b-2">
                    <View className="gap-1">
                      <Text className="text-[16px] font-medium">
                        Open 5 items (daily)
                      </Text>
                      <Text className="text-[16px] font-medium">(4/5)</Text>
                    </View>
                    <View className="flex flex-row items-center">
                      <Image
                        source={require("@/assets/images/reve-point.png")}
                      />
                      <Text className="ml-2 text-[16px] font-medium">
                        30 pts
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-row justify-between items-center py-4 border-b-2">
                    <View className="gap-1">
                      <Text className="text-[16px] font-medium">
                        Rent 2 items (weekly)
                      </Text>
                      <Text className="text-[16px] font-medium">(1/2)</Text>
                    </View>
                    <View className="flex flex-row items-center">
                      <Image
                        source={require("@/assets/images/reve-point.png")}
                      />
                      <Text className="ml-2 text-[16px] font-medium">
                        250 pts
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-row justify-between items-center py-4 border-b-2">
                    <View className="gap-1">
                      <Text className="text-[16px] font-medium">
                        Rent 10 items in total
                      </Text>
                      <Text className="text-[16px] font-medium">(7/10)</Text>
                    </View>
                    <View className="flex flex-row items-center">
                      <Image
                        source={require("@/assets/images/reve-point.png")}
                      />
                      <Text className="ml-2 text-[16px] font-medium">
                        1500 pts
                      </Text>
                    </View>
                  </View>
                  {claim && (
                    <View className="flex flex-row justify-between items-center py-4 border-b-2">
                      <View className="gap-1">
                        <Text className="text-[16px] text-[#0EAB00] font-medium">
                          Open ReVe app (daily)
                        </Text>
                        <Text className="text-[16px] text-[#0EAB00] font-black">
                          (completed)
                        </Text>
                      </View>
                      <View className="flex flex-row items-center">
                        <Image
                          source={require("@/assets/images/reve-point.png")}
                        />
                        <Text className="ml-2 text-[16px] text-[#0EAB00] font-black">
                          25 pts
                        </Text>
                      </View>
                    </View>
                  )}
                  <View className="flex flex-row justify-between items-center py-4 border-b-2">
                    <View className="gap-1">
                      <Text className="text-[16px] text-[#0EAB00] font-black">
                        Open ReVe app (daily)
                      </Text>
                      <Text className="text-[16px] text-[#0EAB00] font-black">
                        (completed)
                      </Text>
                    </View>
                    <View className="flex flex-row items-center">
                      <Image
                        source={require("@/assets/images/reve-point.png")}
                      />
                      <Text className="ml-2 text-[16px] text-[#0EAB00] font-black">
                        1000 pts
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-row justify-between items-center py-4 border-b-2">
                    <View className="gap-1">
                      <Text className="text-[16px] text-[#0EAB00] font-black">
                        Open ReVe app (daily)
                      </Text>
                      <Text className="text-[16px] text-[#0EAB00] font-black">
                        (completed)
                      </Text>
                    </View>
                    <View className="flex flex-row items-center">
                      <Image
                        source={require("@/assets/images/reve-point.png")}
                      />
                      <Text className="ml-2 text-[16px] text-[#0EAB00] font-black">
                        500 pts
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              {tab === "perks" && (
                <View className="w-full px-6">
                  <View className="flex flex-row space-x-2 items-center py-4 border-b-2">
                    <Image
                      source={require("@/assets/images/bronze-perk.png")}
                    />
                    <View className="">
                      <Text className="text-[16px] text-[#DC9E79] font-semibold ">
                        Bronze
                      </Text>
                      <Text className="font-medium">
                        1% discount for every purchase
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-row space-x-2.5 items-center py-4 border-b-2">
                    <Image
                      className="ml-1.5"
                      source={require("@/assets/images/silver-perk.png")}
                    />
                    <View className="">
                      <Text className="text-[16px] text-[#C4C4C4] font-semibold ">
                        Silver
                      </Text>
                      <Text className="font-medium">
                        2% discount for every purchase
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-row space-x-2 items-center py-4 border-b-2">
                    <Image
                      className="ml-1.5"
                      source={require("@/assets/images/gold-perk.png")}
                    />
                    <View className="">
                      <Text className="text-[16px] text-[#BB8A26] font-semibold ">
                        Gold
                      </Text>
                      <Text className="font-medium">
                        5% discount for every purchase
                      </Text>
                      <Text className="font-medium">
                        New daily mission unlocked
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-row space-x-2 items-center py-4 border-b-2">
                    <Image
                      className="ml-2"
                      source={require("@/assets/images/platinum-perk.png")}
                    />
                    <View className="">
                      <Text className="text-[16px] text-[#97E1FE] font-semibold ">
                        Platinum
                      </Text>
                      <Text className="font-medium">
                        10% discount for every purchase
                      </Text>
                      <Text className="font-medium">
                        Special daily mission unlocked
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              {tab === "contributions" && (
                <View className="items-center space-y-4 mt-4">
                  <Text className="text-[20px] font-bold">Keep it up!</Text>
                  <View className="w-[200px] h-[200px] border-2 rounded-xl justify-center items-center">
                    <Image
                      className="w-[82px] h-[82px]"
                      source={require("@assets/images/carbon-icon.png")}
                    />
                    <Text className="text-[16px] font-bold">
                      Carbon Dioxide
                    </Text>
                    <Text className="text-[16px] font-bold">
                      {waste.textile} Liter
                    </Text>
                  </View>
                  <View className="w-[200px] h-[200px] border-2 rounded-xl justify-center items-center">
                    <Image
                      className="w-[82px] h-[82px]"
                      source={require("@assets/images/water-icon.png")}
                    />
                    <Text className="text-[16px] font-bold">Water</Text>
                    <Text className="text-[16px] font-bold">
                      {waste.water} Liter
                    </Text>
                  </View>
                  <View className="w-[200px] h-[200px] border-2 rounded-xl justify-center items-center">
                    <Image
                      className="w-[82px] h-[82px]"
                      source={require("@assets/images/trash-icon.png")}
                    />
                    <Text className="text-[16px] font-bold">Textile Waste</Text>
                    <Text className="text-[16px] font-bold">
                      {waste.textile} KG
                    </Text>
                  </View>
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
