import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getDownloadUrl } from "@/firebase/storage";

import { bagItem } from "@/db/user";
import { useUser } from "@/hooks/useUser";

import { Picker } from "@react-native-picker/picker";

export default function Page() {
  const router = useRouter();
  const { user } = useUser();

  const [imageUrl, setImageUrl] = useState(null);
  const [isBagging, setIsBagging] = useState(false);

  const [batch, setBatch] = useState(0);

  const currentDay = new Date();
  const nextMonday = new Date();
  nextMonday.setDate(
    currentDay.getDate() + ((1 + 7 - currentDay.getDay()) % 7)
  );
  const batchDates = [];
  for (let i = 1; i <= 8; i++) {
    const start = new Date(nextMonday);
    start.setDate(start.getDate() + (i - 1) * 7);
    const end = new Date(nextMonday);
    end.setDate(end.getDate() + i * 7 - 1);
    batchDates.push([start, end]);
  }

  const { id, name, brand, image, size, description, price } =
    useLocalSearchParams();
  const clothe = { id, name, brand, image, size, description, price };

  useEffect(() => {
    getDownloadUrl(image).then((url) => {
      setImageUrl(url);
    });
  }, []);

  const handleBagItem = (destination) => {
    if (!user) {
      router.push("/login");
      return;
    }

    setIsBagging(true);
    bagItem(user.id, clothe.id, batchDates[batch])
      .then(() => {
        alert("Item added to bag");
        router.push(destination);
      })
      .catch((e) => {
        alert(e.message);
      })
      .finally(() => {
        setIsBagging(false);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <Image
            source={require("@/assets/images/placeholder.png")}
            style={styles.image}
          />
        )}
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>Rp{price}/week</Text>
        <Text style={styles.size}>Size: {size}</Text>
        <Text style={styles.description}>{description}</Text>
        <View>
          <Picker
            testID="picker"
            selectedValue={batch}
            style={styles.picker}
            onValueChange={(v) => setBatch(v)}
            mode="dropdown">
            {batchDates.map((batchDate, i) => (
              <Picker.Item
                key={i}
                label={`Batch ${
                  i + 5
                } (${batchDate[0].toLocaleDateString()} - ${batchDate[1].toLocaleDateString()})`}
                value={i}
                enabled={i !== batch}
                style={{ color: i === batch ? "#5d1ba8" : "#000" }}
              />
            ))}
          </Picker>
        </View>
        <View>
          <TouchableOpacity
            className="py-[12px] items-center border-4 border-[#B71800] rounded-lg"
            onPress={() => handleBagItem("/bag")}>
            <Text className="text-[18px] font-bold text-[#B71800]">
              Add to Bag
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="mt-1 py-[12px] items-center border-4 bg-[#B71800] border-[#B71800] rounded-lg"
            onPress={() => handleBagItem("/purchase")}>
            <Text style={styles.buttonText}>Order Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  imageContainer: {
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.2, // For iOS shadow
    shadowRadius: 4, // For iOS shadow
  },
  detailsContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    // elevation: 3, // For Android shadow
    // shadowColor: "#000", // For iOS shadow
    // shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    // shadowOpacity: 0.2, // For iOS shadow
    // shadowRadius: 4, // For iOS shadow
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  size: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "justify",
  },
  addToBagButton: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  orderNowButton: {
    backgroundColor: "#B71800",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
