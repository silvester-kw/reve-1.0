import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Platform,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { useLocalSearchParams, useRouter } from "expo-router";

import { getProductsByType, blankProduct } from "@/db/product";
import { getDownloadUrl } from "@/firebase/storage";

import ProductCard from "@/components/productCard";

function MyFlatList ({ products }) {
  return (
    <FlatList
      scrollEnabled={false}
      data={products}
      renderItem={({ item }) => <ProductCard item={item} />}
      keyExtractor={(item) => item.id}
      numColumns={2}
    />
  );
};

export default function ShirtCatalogue () {
  const {slug} = useLocalSearchParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsByType(slug).then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.container}>
          <Header title="Catalogue" />
          <ScrollView>
            <Hero />
            <View>
              <Text
                style={{
                  color: "#000",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginTop: 20,
                  marginLeft: 20,
                }}>
                {slug}
              </Text>
            </View>
            <View style={{ marginHorizontal: 16 }}>
              <MyFlatList products={products}/>
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
    backgroundColor: "#000", // Match the background color of the header
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  brand: {
    fontSize: 16,
    color: "#888",
    marginBottom: 8,
  },
  rentingRange: {
    fontSize: 14,
    color: "#666",
  },
  status: {
    fontSize: 14,
  },
  button: {
    marginTop: 8,
    backgroundColor: "#28a745",
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    width: "100%",
    height: 60,
    backgroundColor: "#000",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between", // Ensures space between the items
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center", // Centers the title horizontally within this container
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  profileLogo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  menuText: {
    padding: 10,
    fontSize: 16,
  },
  item: {
    flexDirection: "column",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    width: "50%",
  },
  image: {
    width: 100, // Adjust image width and height as needed
    height: 100,
    marginRight: 16, // Add margin for spacing
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  priceAndSizeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    width: "full",
  },
  price: {
    fontSize: 14,
    color: "#666",
  },
  size: {
    fontSize: 14,
    color: "#666",
  },
});
