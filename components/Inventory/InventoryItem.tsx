import { useProduct, useSite } from "@utils/store";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Inventory } from "@utils/types";
import { useRouter } from "expo-router";

const InventoryItem = ({
	setOpenModal,
	itemData,
}: {
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	itemData: Inventory;
}) => {
	const { setProduct } = useProduct();
	const { is_super } = useSite();
	const router = useRouter();

	const updateItems = () => {
		setOpenModal(true);
		setProduct(itemData.product, itemData.i_id, itemData.quantity);
	};

	return (
		<TouchableOpacity
			className="mx-3 flex flex-row bg-white rounded-lg my-2 justify-center items-center"
			onPress={() => router.push(`/inventory-log/${itemData.product}`)}
		>
			<View className="basis-5/12 flex items-center m-3">
				<View className="w-full h-28">
					{itemData.url && (
						<Image className="h-full w-full" source={{ uri: itemData.url }} />
					)}
				</View>
			</View>

			<View className="basis-5/12 flex justify-center items-center">
				<Text>{itemData.product}</Text>
				<Text className="text-black text-lg py-1 font-semibold">
					{itemData.quantity}
				</Text>
				{is_super && (
					<TouchableOpacity
						className="py-3 px-5 rounded-lg bg-[#fc8019]"
						onPress={updateItems}
					>
						<Text className="text-white">Update</Text>
					</TouchableOpacity>
				)}
			</View>
		</TouchableOpacity>
	);
};
export default InventoryItem;
