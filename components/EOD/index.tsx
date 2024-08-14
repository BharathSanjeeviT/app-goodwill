import React, { useEffect, useState } from "react";
import { Text, ScrollView, TouchableOpacity, View } from "react-native"
import NavBar from "@components/NavBar"
import EODItemComp from "@components/EOD/EODItems"
import UpdateInventoryModal from "@components/EOD/UpdateModal"
import data from "inventory-data.json"
import { useUpdatedProducts } from "@utils/store";
import { useRouter } from "expo-router";
const EODComponent = () => {

  const { initValue } = useUpdatedProducts()
  const router = useRouter()

  useEffect(() => {
    const initUpdatedProducts: Array<{ id: string, quantity: number }> = data.map(({ id, quantity }) => ({ id, quantity }));
    initValue(initUpdatedProducts);
  }, [data, initValue]);

  const [openModal, setOpenModal] = useState(false)

  const proceedNext = () => {
    router.push('/eod-submit/details')
  }

  return (
    <View className="bg-[#ede3da] min-h-[100vh] pt-20">
      <NavBar link="EOD Inventory" />
      {openModal && <UpdateInventoryModal setOpenModal={setOpenModal} />}
      <ScrollView className="mb-10">
        {data.map((ele, idx) => (
          <EODItemComp key={idx} itemData={ele} setOpenModal={setOpenModal} />
        ))}
      </ScrollView>
      <View className="absolute bottom-0 w-full">
        <TouchableOpacity
          className="bg-[#fc8019] flex justify-center items-center py-3 rounded-lg w-full"
          onPress={proceedNext}
        >
          <Text className="text-lg font-semibold text-white">
            Proceed Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default EODComponent;
