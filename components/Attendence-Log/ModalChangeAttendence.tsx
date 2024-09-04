import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AttendanceRecord } from "@utils/types";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { API_URL } from "@utils/config";
import { useSession } from "@utils/store";
import { format } from "date-fns";

const ModalChangeAttendence = ({
	from,
	to,
	setFrom,
	setTo,
	CloseModal,
	setData,
	setBody,
}: {
	from: Date;
	to: Date;
	setFrom: React.Dispatch<React.SetStateAction<Date>>;
	setTo: React.Dispatch<React.SetStateAction<Date>>;
	CloseModal: () => void;
	setData: (ele: Array<AttendanceRecord>) => void;
	setBody: (ele: any) => void;
}) => {
	const { uid } = useSession();
	const [loading, setLoading] = useState(false);
	const getAttendence = async () => {
		try {
			setLoading(true);
			const body = {
				token: uid,
				start_date: format(from, "MM-dd-yyyy"),
				end_date: format(to, "MM-dd-yyyy"),
			};
			setBody(body);
			const { data } = await axios.post(`${API_URL}/attendance/get`, {});
			if (data.attendance.length > 0) {
				setData(data.attendance);
			}
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
			setCloseFrom(false);
			setCloseTo(false);
			CloseModal();
		}
	};
	const [closeFrom, setCloseFrom] = useState(false);
	const [closeTo, setCloseTo] = useState(false);
	return (
		<View className="absolute top-0 left-0 bottom-0 z-10 w-[100vw] h-[100vh] flex justify-center items-center bg-[#00000050] px-3">
			{closeFrom && (
				<DateTimePicker
					value={from}
					mode="date"
					display="default"
					onChange={(date) => {
						setFrom(new Date(date.nativeEvent.timestamp));
						setCloseFrom(false);
					}}
				/>
			)}

			{closeTo && (
				<DateTimePicker
					value={to}
					mode="date"
					display="default"
					onChange={(date) => {
						setTo(new Date(date.nativeEvent.timestamp));
						setCloseTo(false);
					}}
				/>
			)}
			<View className="bg-white p-5 rounded-lg border-2 flex justify-center items-center flex-col">
				<Text className="text-lg font-semibold">Choose Attendence Date</Text>
				<Text className="text-lg font-semibold my-3">
					From {format(from, "PPP")} to {format(to, "PPP")}
				</Text>
				<View className="flex flex-row justify-between">
					<TouchableOpacity
						className="bg-[#006dd6] p-3 mx-5 my-2 rounded-lg"
						onPress={() => setCloseFrom(true)}
					>
						<Text className="font-semibold text-white">Change From</Text>
					</TouchableOpacity>
					<TouchableOpacity
						className="bg-[#006dd6] p-3 mx-5 my-2 rounded-lg"
						onPress={() => setCloseTo(true)}
					>
						<Text className="font-semibold text-white">Change To</Text>
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					className="bg-[#ff9b00] p-3 mx-5 my-3 rounded-lg"
					onPress={getAttendence}
					disabled={loading}
				>
					<Text className="text-center my-1">
						{loading ? "Loading..." : "Get Attendence"}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={CloseModal}
					className="bg-[#ff9b00] p-3 mx-5 my-2 rounded-lg"
				>
					<Text className="text-center my-1">Close</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
export default ModalChangeAttendence;
