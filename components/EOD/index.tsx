import React, { useEffect, useState } from "react";
import {
	Text,
	ScrollView,
	TouchableOpacity,
	View,
	TextInput,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import NavBar from "@components/NavBar";
import EODItemComp from "@components/EOD/EODItems";
import UpdateInventoryModal from "@components/EOD/UpdateModal";
import { useSite, useUpdatedProducts } from "@utils/store";
import { useRouter } from "expo-router";
import { Inventory } from "@utils/types";
import axios from "axios";
import { API_URL } from "@utils/config";
const EODComponent = () => {
	const { initValue } = useUpdatedProducts();
	const router = useRouter();

	const { site_id } = useSite();
	const [grep, setGrep] = useState("");
	const [data, setData] = useState<Array<Inventory>>([]);
	const [originalData, setOriginalData] = useState<Array<Inventory>>([]);

	useEffect(() => {
		(async () => {
			const { data } = await axios.post(`${API_URL}/inventory`, {
				s_id: site_id,
			});
			setData(data.inventory);
			setOriginalData(data.inventory);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.post(`${API_URL}/inventory`, {
					s_id: site_id,
				});
				setData(data.inventory);
				setOriginalData(data.inventory);
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	useEffect(() => {
		const initUpdatedProducts: Array<{ product: string; quantity: number }> =
			data.map(({ product, quantity }) => ({ product, quantity }));
		initValue(initUpdatedProducts);
	}, [data]);

	useEffect(() => {
		if (grep === "") {
			setData(originalData);
		} else {
			setData(
				originalData.filter((ele) =>
					ele.product.toLowerCase().includes(grep.toLowerCase()),
				),
			);
		}
	}, [grep]);

	const [openModal, setOpenModal] = useState(false);

	const proceedNext = () => {
		router.push("/eod-submit/details");
	};

	return (
		<View className="bg-[#ede3da] min-h-[100vh] pt-36">
			<NavBar link="EOD Inventory" />
			{openModal && <UpdateInventoryModal setOpenModal={setOpenModal} />}

			<View className="absolute top-20 left-0 w-full py-3 px-3 flex flex-row items-center justify-center z-10">
				<AntDesign name="search1" size={24} color="black" />
				<TextInput
					value={grep}
					onChangeText={(data) => {
						console.log(data);
						setGrep(data);
					}}
					className="w-10/12 px-3 bg-[#ffffff] rounded-lg ml-3 py-3 text-lg"
				/>
			</View>
			<ScrollView className="mb-10">
				{data.map((ele, idx) => (
					<EODItemComp key={idx} itemData={ele} setOpenModal={setOpenModal} />
				))}
			</ScrollView>
			<View className="absolute bottom-2 w-full">
				<TouchableOpacity
					className="bg-blue-500 flex justify-center items-center py-3 rounded-lg w-full"
					onPress={proceedNext}
				>
					<Text className="text-lg font-semibold text-white">Proceed Next</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
export default EODComponent;
