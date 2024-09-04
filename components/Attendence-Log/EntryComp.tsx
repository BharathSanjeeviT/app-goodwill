import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { View, Text } from "react-native";
import { AttendanceRecord } from "@utils/types";
import { utcToIst } from "@utils/store";

const AttendenceEntry = (ele: AttendanceRecord) => {
  return (
    <View>
      <View className={`relative flex bg-[#edffd2] mx-3 rounded-lg my-2 p-2`}>
        <View className="absolute top-4 right-4 flex flex-row justify-center items-center">
          <Text className="mx-2 text-md">Present</Text>
          <AntDesign name="checkcircle" size={20} color="green" />
        </View>

        <View className="absolute bottom-4 right-4 flex flex-row justify-center items-center">
          <Text className="text-md">{ele.s_name}</Text>
        </View>
        <Text className="text-lg font-semibold pt-2 px-2">
          {new Date(ele.day).toDateString()}
        </Text>
        <View className="pb-2 px-2">
          <View className="flex flex-row gap-5">
            <View>
              <Text className="text-md my-1">Check In</Text>
              <Text className="text-xl font-semibold">
								{utcToIst(ele.check_in).toLocaleTimeString().slice(0, 8)}
              </Text>
            </View>
            <View>
              <Text className="text-md my-1">Check Out</Text>
              <Text className="text-xl font-semibold">
                {ele.check_out ? utcToIst(ele.check_out).toLocaleTimeString().slice(0, 8) : "N/A"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default AttendenceEntry;
