import React from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { View, Text } from "react-native";

interface AttendanceRecord {
  intime: string;
  is_present: boolean;
  site_name: string;
  date: string;
}

const AttendenceEntry = (ele: AttendanceRecord) => {
  return (
    <View>
      <View className={`relative flex bg-[#edffd2] mx-3 rounded-lg my-2`}>

        <View className="absolute top-4 right-4 flex flex-row justify-center items-center">
          <Text className="mx-2 text-md">
            Present
          </Text>
          <AntDesign name="checkcircle" size={20} color="green" />
        </View>

        <View className="absolute bottom-4 right-4 flex flex-row justify-center items-center">
          <Text className="text-md">
            {ele.site_name}
          </Text>
        </View>
        <View className="p-2">
          <Text className="text-md my-1">
            Check In
          </Text>
          <Text className="text-xl font-semibold">
            {ele.intime}
          </Text>
          <Text className="text-lg font-semibold">
            {ele.date}
          </Text>
        </View>

      </View>
    </View>
  )
}
export default AttendenceEntry;
