import React from "react"
import MapContainer from "./MapContainer"
import Attendence from "./Attendence"
import Menu from "./Menu"
import { SafeAreaView } from 'react-native';

export const HomePage = () => {
  return (
    <SafeAreaView className="h-screen bg-[#ede3da] flex justify-between">
      <MapContainer />
      <Menu />
      <Attendence />
    </SafeAreaView>
  )
}
