import { API_URL } from "@utils/config";
import { useProduct, useSession, useSite } from "@utils/store";
import axios from "axios";
import React, { useState } from "react";
import {
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Pressable,
	ToastAndroid,
} from "react-native";

const UpdateInventoryModal = ({
	setOpenModal,
	addQuantityToData,
}: {
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	addQuantityToData: (name: string, quan: number) => void;
}) => {
	const { name } = useProduct();
	const { uid } = useSession();
	const { site_id } = useSite();
	const [loading, setLoading] = useState(false);
	const [quantity, setQuantity] = useState("");
	const submit = async () => {
		try {
			setLoading(true);
			const { data } = await axios.put(`${API_URL}/inventory/`, {
				token: uid,
				s_id: site_id,
				product: name,
				quantity: parseInt(quantity),
			});
			console.log(data);
			addQuantityToData(name, parseInt(quantity));
			alert("Prodcut updated sucessfully");
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
			setOpenModal(false);
		}
	};
	return (
		<Pressable
			className="absolute top-20 left-0 right-0 bottom-0 z-20 w-full h-screen flex justify-center items-center bg-[#00000050]"
			onPress={() => setOpenModal(false)}
		>
			<Pressable className="flex bg-white rounded-lg py-6 px-5">
				<View className="items-center justify-center flex">
					<Text className="font-semibold text-xl">Update {name}</Text>
				</View>
				<View className="flex flex-row justify-center items-center py-4">
					<Text className="text-lg">Total in</Text>
					<TextInput
						className="p-3 text-lg bg-[#fff8f3] rounded-lg w-24 mx-3"
						keyboardType="number-pad"
						placeholder="00000"
						maxLength={5}
						onChangeText={setQuantity}
						editable={!loading}
						value={quantity}
					/>
				</View>

				<TouchableOpacity
					className="bg-[#fc8019] flex justify-center items-center py-3 rounded-lg"
					onPress={() => submit()}
					disabled={loading}
				>
					<Text className="text-lg text-white font-semibold">
						{loading ? "Updating" : "Update"}
					</Text>
				</TouchableOpacity>
			</Pressable>
		</Pressable>
	);
};
export default UpdateInventoryModal;
