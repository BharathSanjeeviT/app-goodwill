import React from "react";
import MapContainer from "./MapContainer";
import Attendence from "./Attendence";
import Menu from "./Menu";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

export const HomePage = () => {
  return (
    <SafeAreaView className="min-h-screen bg-[#ede3da] flex justify-between pt-3">
      <View className="absolute top-0 w-full z-10">
        <Notification />
      </View>
      <MapContainer />
      <Menu />
      <Attendence />
    </SafeAreaView>
  );
};

const Notification = () => {
  const router = useRouter();
  return (
    <View className="flex flex-row justify-between">
      <TouchableOpacity
        onPress={() => {
          router.push("/profile");
        }}
      >
        <View className="p-5">
          <AntDesign name="user" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("/notifications");
        }}
      >
        <View className="p-5">
          <Ionicons name="notifications" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};
