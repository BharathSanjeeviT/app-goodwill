import { useProduct, useUpdatedProducts   } from "@utils/store"
import { Inventory } from "@utils/types";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native"

const EODItemComp = ({ itemData, setOpenModal }: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  itemData: Inventory 
}) => {

  const { setProduct } = useProduct();
  const { getUpatedItem } = useUpdatedProducts()

  const updateItems = () => {
    setProduct(itemData.product, itemData.product, itemData.quantity)
    setOpenModal(true)
  }

  return (
    <View className="mx-3 flex flex-row py-2 bg-white rounded-lg my-2 justify-center items-center">
      <View className="basis-5/12 flex items-center m-3">
        <View className="w-full h-32">
          {
            itemData.url &&
            <Image
              className="h-full w-full"
              source={{ uri: itemData.url }}
            />
          }
        </View>
      </View>

      <View className="basis-5/12 flex justify-between items-center">
        <Text className="text-lg font-semibold">
          {itemData.product}
        </Text>

        <View className="flex flex-col my-2">
          <Text className="text-black text-md py-1 font-semibold mx-2">
            Current : {itemData.quantity}
          </Text>
          <View className="flex flex-row justify-center items-center">
            <Text className="text-black text-md py-1 font-semibold mx-2">
              Removed : {getUpatedItem(itemData.product)}
            </Text>
          </View>
        </View>

        <TouchableOpacity className="py-3 px-5 rounded-lg bg-[#fc8019] flex justify-center items-center"
          onPress={updateItems}
        >
          <Text className="font-semibold text-white">
            Remove
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}
export default EODItemComp;
