import { useProduct, useUpdatedProducts   } from "@utils/store"
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native"

interface InventoryItems {
  name: string;
  quantity: number;
  image?: string;
  id: string;
}

const EODItemComp = ({ itemData, setOpenModal }: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  itemData: InventoryItems
}) => {

  const { setProduct } = useProduct();
  const { getUpatedItem } = useUpdatedProducts()

  const updateItems = () => {
    setProduct(itemData.name, itemData.id, itemData.quantity)
    setOpenModal(true)
  }

  return (
    <View className="mx-3 flex flex-row py-2 bg-white rounded-lg my-2 justify-center items-center">
      <View className="basis-5/12 flex items-center m-3">
        <View className="w-full h-32">
          {
            itemData.image &&
            <Image
              className="h-full w-full"
              source={{ uri: itemData.image }}
            />
          }
        </View>
      </View>

      <View className="basis-5/12 flex justify-between items-center">
        <Text className="text-lg font-semibold">
          {itemData.name}
        </Text>

        <View className="flex flex-col my-2">
          <Text className="text-black text-md py-1 font-semibold mx-2">
            Current : {itemData.quantity}
          </Text>
          <View className="flex flex-row justify-center items-center">
            <Text className="text-black text-md py-1 font-semibold mx-2">
              Updated : {getUpatedItem(itemData.id)}
            </Text>
          </View>
        </View>

        <TouchableOpacity className="py-3 px-5 rounded-lg bg-[#fc8019] flex justify-center items-center"
          onPress={updateItems}
        >
          <Text className="font-semibold text-white">
            Update
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}
export default EODItemComp;
