import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

const Container = ({
	s_name,
	lat,
	lng,
}: {
	s_name: string;
	lat: string;
	lng: string;
}) => {
	const redirectToGmap = () => {
		const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
		Linking.openURL(url);
	};
	return (
		<View className="w-11/12 mx-3 flex flex-row justify-between mt-20 bg-white p-5 rounded-lg shadow-lg items-center my-2">
			<Text className="text-xl"> {s_name} </Text>
			<TouchableOpacity
				className="bg-[#fc8019] py-3 px-5 rounded-lg"
				onPress={redirectToGmap}
			>
				<Entypo name="location" size={24} color="white" />
			</TouchableOpacity>
		</View>
	);
};
export default Container;
