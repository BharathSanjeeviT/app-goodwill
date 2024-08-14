import React, { useEffect } from "react";
import NavBar from "@components/NavBar"
import { View, ScrollView, Text } from "react-native"
import AttendenceEntry from "@components/Attendence-Log/EntryComp"
import Piechart from "@components/Attendence-Log/Piechart"
import data from "data.json"

const AttendenceLogComp = () => {
  useEffect(() => {
    (async () => {
      console.log("lessgo")
    })()
  }, [])
  return (
    <View className="h-[100vh] w-[100vw] bg-[#ede3da] pt-20">
      <NavBar link="Attendence Log" />
      <ScrollView>
        <Piechart />
        <Text className="text-center text-2xl font-semibold my-2">
          History
        </Text>
        {data.map((ele, idx) => (
          <AttendenceEntry key={idx} {...ele} />
        ))}
      </ScrollView>
    </View>
  )
}
export default AttendenceLogComp;

