import { useState, useEffect } from "react";

import { View, Image, Text } from "react-native";

import { getDownloadUrl } from "@/firebase/storage";

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export default function ProductMiniCard({ item }) {
  // const [imageUrl, setImageUrl] = useState(null);

  // useEffect(() => {
  //   getDownloadUrl(item.image).then((url) => {
  //     setImageUrl(url);
  //   });
  // }, []);

  return (
    <View className="flex flex-row pt-1 pb-2 border-[1.5px] rounded-md border-gray-400 justify-start items-center gap-2 m-0 pl-3 shadow-sm shadow-black">
      <View className="flex flex-row border-2 rounded-md border-gray-400 w-12 h-16">
        {/* {imageUrl ? (
          <Image source={{ uri: imageUrl }} className="max-h-full max-w-full" />
        ) : (
          <Image
            source={require("@/assets/images/placeholder.png")}
            className="max-h-full max-w-full"
          />
        )} */}
      </View>
      <View className="flex flex-col gap-1">
        <Text className="text-lg font-bold">{item.name}</Text>
        <View className="flex flex-row justify-between">
          {/* <Text className="text-sm">{item.brand}</Text> */}
          <Text className="text-sm font-bold">{item.size}</Text>
        </View>
        <Text className="text-sm mr-2">
          {currencyFormatter.format(item.price)} / Batch
        </Text>
      </View>
    </View>
  );
}
