import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Octicons from "@expo/vector-icons/Octicons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSite } from "@utils/store";

const Menu = () => {
	const router = useRouter();
	const { is_super, attendenceStatus } = useSite();
	return (
		<View className="flex justify-center items-center">
			<View className="flex justify-evenly items-center w-full gap-7">
				<View className="flex justify-evenly items-center flex-row w-full">
					<TouchableOpacity
						className="w-5/12 rounded-lg bg-white flex"
						onPress={() => {
							router.push("/inventory-log");
						}}
					>
						<View className="items-end p-5">
							<Entypo name="shopping-cart" size={24} color="black" />
						</View>
						<View className="justify-start pb-5">
							<Text className="text-xl text-left text-black font-medium pl-5 pt-2">
								Inventory {"\n"}Log
							</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						className="w-5/12 rounded-lg bg-white flex"
						onPress={() => {
							router.push("/attendence-log");
						}}
					>
						<View className="items-end p-5">
							<FontAwesome5 name="user-clock" size={24} color="black" />
						</View>
						<View className="justify-start pb-5">
							<Text className="text-xl text-left text-black font-medium pl-5 pt-2">
								Attendence {"\n"}Log
							</Text>
						</View>
					</TouchableOpacity>
				</View>
				{is_super && (attendenceStatus===false) && (
					<TouchableOpacity
						className="w-11/12 rounded-lg flex flex-row justify-center items-center py-4 bg-[#fc8019]"
						onPress={() => router.push("/eod-submit")}
					>
						<Text className="font-semibold text-lg text-white mx-3">
							Submit EOD Report
						</Text>
						<MaterialIcons name="report" size={22} color="white" />
					</TouchableOpacity>
				)}

				<TouchableOpacity
					className="w-11/12 bg-[#405d72] rounded-lg flex flex-row justify-center items-center py-4"
					onPress={() => router.push("/broadcast")}
				>
					<Text className="text-center font-semibold text-white text-xl mx-3">
						Boradcast
					</Text>
					<Octicons name="broadcast" size={22} color="white" />
				</TouchableOpacity>
			</View>
		</View>
	);
};
export default Menu;
