import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

const Loader = ({ content }: { content: string }) => {
	return (
		<View className="z-50 absolute left-0 right-0 bottom-0 top-0 bg-white/60 flex justify-center items-center">
			<Text className="text-xl font-semibold"> {content} </Text>
		</View>
	);
};
export { Loader };
