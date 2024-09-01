import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

const NavBar = ({ link }: { link: string }) => {
	const router = useRouter();
	return (
		<View className="absolute top-0 left-0 bg-[#405d72] w-full py-5 px-3 flex flex-row items-center justify-center h-20 z-10">
			<TouchableOpacity
				className="absolute left-3 flex flex-row justify-center"
				onPress={() => {
					router.push("/");
				}}
			>
				<Entypo name="home" size={24} color="white" />
			</TouchableOpacity>
			<View className="mx-8">
				<Text className="text-white text-xl">{link}</Text>
			</View>
		</View>
	);
};
export default NavBar;
