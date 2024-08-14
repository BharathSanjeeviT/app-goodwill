import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native"
import InventoryItem from "@components/Inventory/InventoryItem"
import UpdateInventoryModal from "@components/Inventory/UpdateModal"
import NavBar from "@components/NavBar"
import data from "inventory-data.json"
import { useRouter } from "expo-router";

const InventoryComp = () => {
  const [openModal, setOpenModal] = useState(false)
  const router = useRouter()
  return (
    <View className="bg-[#ede3da] min-h-[100vh] pt-20">
      <NavBar link="Inventory" />
      {openModal && <UpdateInventoryModal setOpenModal={setOpenModal} />}
      <ScrollView className="mb-3"> 
        {data.map((ele, idx) => (
          <InventoryItem key={idx} setOpenModal={setOpenModal} itemData={ele} />
        ))}
      </ScrollView>
      <View className="absolute bottom-0 left-0 w-full">
      </View>
    </View>
  )
}
export default InventoryComp;
