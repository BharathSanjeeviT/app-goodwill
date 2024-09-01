import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import {
	View,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import NavBar from "@components/NavBar";
import "react-native-get-random-values";
import { uploadFilesToS3 } from "@utils/AWSHelper";
import { API_URL, BUCKET_NAME } from "@utils/config";
import axios from "axios";
import { useChangedProducts, useSession, useSite } from "@utils/store";
import { useRouter } from "expo-router";

interface AssignedType {
	worker: string;
	quantity: number;
}

const Details = () => {
	const [tquantity, setTquantity] = useState("");
	const [assigned, setAssigned] = useState<Array<AssignedType>>([]);
	const [fetching, setFetching] = useState(true);
	const [valueArr, setValueArr] = useState<Array<string>>([]);
	const router = useRouter();
	const [image, setImage] = useState<Array<string> | null>(null);
	const [loading, setLoading] = useState(false);
	const { changedOnes } = useChangedProducts();

	const { site_id } = useSite();
	const { uid } = useSession();

	const uploadImages = async () => {
		try {
			if (image) {
				setLoading(true);
				const uploadedURLs: Array<string> = [];
				await Promise.all(
					image.map(async (item) => {
						try {
							const fileExtension = item.split(".").pop();
							const fileName = `${Date.now()}.${fileExtension}`;
							const fileBlob = await fetch(item).then((res) => res.blob());
							await uploadFilesToS3(BUCKET_NAME, fileName, fileBlob);
							uploadedURLs.push(
								`https://${BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${fileName}`,
							);
						} catch (error) {
							console.warn(error);
						}
					}),
				);

				let { status } = await Location.requestForegroundPermissionsAsync();
				if (status !== "granted") {
					alert("Permission to access location was denied");
					return;
				}
				let { coords } = await Location.getCurrentPositionAsync({});
				console.log(coords);
				const lat = coords.latitude;
				const lng = coords.longitude;
				await axios.post(`${API_URL}/site/eod`, {
					s_id: site_id,
					lat,
					lng,
					token: uid,
					images: uploadedURLs,
					workers: assigned,
					inv: changedOnes,
				});
				alert("EOD submitted successfully");
				router.push("/");
			} else {
				alert("Please add images");
			}
		} catch (err) {
			alert("Please wait for 8 hours to do attendence");
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	const removeImage = (uri: string) => {
		setImage((prev) => {
			if (prev) {
				return prev.filter((ele) => ele !== uri);
			} else {
				return null;
			}
		});
	};

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			quality: 1,
		});

		if (!result.canceled) {
			setImage((prev) => {
				if (prev) {
					if (prev.length <= 7) {
						return [...prev, result.assets[0].uri];
					} else {
						alert("Maximum 8 images can be uploaded");
						return prev;
					}
				} else {
					return [result.assets[0].uri];
				}
			});
		}
	};

	const [selectedWorker, setSelectedWorker] = useState("");

	useEffect(() => {
		const fetchWorkers = async () => {
			try {
				const { data } = await axios.get(`${API_URL}/workers`);
				const workers = data.workers.map(
					(item: { worker: string }) => item.worker,
				);
				setValueArr(workers);
				if (workers.length > 0) {
					setSelectedWorker(workers[0]);
				}
			} catch (err) {
				console.error("Error fetching workers:", err);
				Alert.alert("Error", "Failed to fetch workers. Please try again.");
			} finally {
				setFetching(false);
			}
		};

		fetchWorkers();
	}, []);

	const createField = () => {
		if (selectedWorker && tquantity) {
			const quantity = parseInt(tquantity, 10);
			if (quantity <= 0) {
				Alert.alert("Invalid Input", "Quantity should be greater than 0");
				return;
			}

			setAssigned((prev) => [...prev, { worker: selectedWorker, quantity }]);
			setValueArr((prev) => prev.filter((item) => item !== selectedWorker));
			setTquantity("");

			// Update selectedWorker after removing the assigned worker
			const remainingWorkers = valueArr.filter(
				(worker) => worker !== selectedWorker,
			);
			if (remainingWorkers.length > 0) {
				setSelectedWorker(remainingWorkers[0]);
			} else {
				setSelectedWorker("");
			}
		} else {
			Alert.alert("Missing Information", "Please fill all the fields");
		}
	};

	const removeField = (worker: string) => {
		setAssigned((prev) => prev.filter((item) => item.worker !== worker));
		setValueArr((prev) => [...prev, worker]);
		setSelectedWorker(worker);
	};

	return (
		<View className="h-[100vh] pt-20">
			<NavBar link="EOD Details" />
			<ScrollView className="mb-10">
				<Text className="text-center text-xl my-3">Workers Details</Text>
				{fetching ? (
					<Text>Loading...</Text>
				) : (
					<View>
						<View className="flex flex-row mx-3 my-2">
							<View className="w-7/12 px-2 rounded-lg mx-3 border">
								<Picker
									selectedValue={selectedWorker}
									onValueChange={(itemValue) => setSelectedWorker(itemValue)}
									enabled={valueArr.length > 0}
								>
									{valueArr.map((item, idx) => (
										<Picker.Item label={item} value={item} key={idx} />
									))}
								</Picker>
							</View>
							<View className="basis-1/3">
								<TextInput
									className="border rounded-lg p-2"
									placeholder="Count"
									keyboardType="numeric"
									value={tquantity}
									onChangeText={setTquantity}
								/>
							</View>
						</View>
						<View className="flex flex-row justify-center items-center">
							<TouchableOpacity
								className="bg-blue-500 py-3 px-4 rounded-lg mt-2"
								onPress={createField}
								disabled={!selectedWorker || valueArr.length === 0}
							>
								<Text className="text-white text-md">Create</Text>
							</TouchableOpacity>
						</View>
						<View>
							{assigned.map((item, index) => (
								<View key={index} className="flex flex-row mx-3 my-2">
									<TouchableOpacity
										className="flex items-center justify-center"
										onPress={() => removeField(item.worker)}
									>
										<AntDesign name="close" size={20} color="black" />
									</TouchableOpacity>
									<View className="w-1/2 px-2 border rounded-lg mx-3 flex justify-center items-center">
										<Text>{item.worker}</Text>
									</View>
									<View className="basis-1/3">
										<View className="border-2 border-gray-300 rounded-lg p-2">
											<Text>{item.quantity}</Text>
										</View>
									</View>
								</View>
							))}
						</View>
					</View>
				)}
				<Text className="text-center text-xl mt-2">Prodcutivity Details</Text>
				<View className="flex flex-row justify-center items-center">
					<TouchableOpacity
						className="bg-blue-500 rounded-lg my-3"
						onPress={pickImage}
					>
						<Text className="text-center text-md my-3 text-white mx-3">
							Add Image
						</Text>
					</TouchableOpacity>
				</View>
				<View className="flex justify-center items-center">
					{image &&
						image.map((item, idx) => {
							return (
								<View
									key={idx}
									className="flex-row flex justify-center items-center"
								>
									<TouchableOpacity
										className="flex items-center justify-center mx-3"
										onPress={() => removeImage(item)}
									>
										<AntDesign name="close" size={20} color="black" />
									</TouchableOpacity>
									<Image
										source={{ uri: item }}
										style={{ width: 200, height: 200 }}
									/>
								</View>
							);
						})}
				</View>
			</ScrollView>

			<View className="absolute bottom-3 w-full">
				<TouchableOpacity
					className="bg-[#fc8019] flex justify-center items-center py-3 rounded-lg w-full"
					disabled={loading}
					onPress={uploadImages}
				>
					<Text className="text-lg font-semibold text-white">
						{loading ? "Uploading..." : "Upload Images and Submit EOD"}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
export default Details;
