import { useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { useUser } from "@/hooks/useUser";
import { Button, TextInput } from "react-native-paper";

import { useRouter, useNavigation } from "expo-router";
import { StackActions } from "@react-navigation/native";

export default function Login() {
  const router = useRouter();
  const navigation = useNavigation();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { user, login, register } = useUser();

  const handleSubmit = () => {
    setIsLoading(true);

    if (isLogin) {
      login(email, password)
        .then(() => {
          alert("Logged in");
          navigation.dispatch(StackActions.popToTop());
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      register(email, password, { name })
        .then(() => {
          alert("Registered");
          navigation.dispatch(StackActions.popToTop());
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <View className="bg-gray-100 h-full w-full flex flex-col my-auto items-center p-8 gap-y-4 justify-between">
      <Image
        source={require("@/assets/images/reve-icon.png")} // Use the imported image
        className="w-36 h-36 shadow-xl overflow-visible mb-16"
      />
      <View className="flex flex-col items-center gap-y-1 w-full mb-16">
        <Text className="text-xl mt-8 self-start">Email</Text>
        <TextInput
          label="Email"
          mode="outlined"
          className="w-full bg-gray-100 text-black mb-4"
          underlineColor="transparent"
          placeholder="Email"
          textColor="#212121"
          placeholderTextColor="#858585"
          activeOutlineColor="#696969"
          onChangeText={setEmail}
        />
        <Text className="text-xl mt-8 self-start">Password</Text>
        <TextInput
          label="Password"
          mode="outlined"
          className="w-full bg-gray-100 text-black"
          underlineColor="transparent"
          placeholder="Password"
          secureTextEntry
          textColor="#212121"
          placeholderTextColor="#858585"
          activeOutlineColor="#696969"
          onChangeText={setPassword}
        />
        {!isLogin && (
          <>
            <Text className="text-xl mt-8 self-start">Name</Text>
            <TextInput
              label="Name"
              mode="outlined"
              className="w-full bg-gray-100 text-black"
              underlineColor="transparent"
              placeholder="Name"
              textColor="#212121"
              placeholderTextColor="#858585"
              activeOutlineColor="#696969"
              onChangeText={setName}
            />
          </>
        )}
      </View>
      <View className="w-full flex flex-col items-center gap-y-4">
        <Button mode="contained" className="w-full rounded-lg h-12 items-center justify-center" onPress={handleSubmit} buttonColor="#212121" textColor="white" labelStyle={{ width: "100%" }} loading={isLoading}>
          <Text className="text-lg w-full text-center">{isLogin ? "Login" : "Sign Up"}</Text>
        </Button>
        <View className="flex flex-row items-center gap-x-2">
          <Text className="text-lg">{isLogin ? "Don't have an account?" : "Already have an account?"}</Text>
          <TouchableOpacity
            onPress={() => {
              setIsLogin(!isLogin);
            }}
          >
            <Text className="text-blue-500 text-lg">{isLogin ? "Sign Up" : "Login"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
