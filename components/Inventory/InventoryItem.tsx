import { useProduct } from "@utils/store"
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native"

interface InventoryItems {
  name: string;
  quantity: number;
  image?: string;
  id: string;
}

const InventoryItem = ({ setOpenModal, itemData }: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  itemData: InventoryItems
}) => {

  const { setProduct } = useProduct();

  const updateItems = () => {
    setOpenModal(true)
    setProduct(itemData.name, itemData.id)
  }

  return (
    <View className="mx-3 flex flex-row bg-white rounded-lg my-2 justify-center items-center">
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

      <View className="basis-5/12 flex justify-center items-center">
        <Text className="text-lg font-semibold">
          {itemData.name}
        </Text>
        <Text className="text-black text-lg py-1 font-semibold">
          {itemData.quantity}
        </Text>
        <TouchableOpacity className="py-3 px-5 rounded-lg bg-[#fc8019]"
          onPress={updateItems}
        >
          <Text className="text-md font-semibold text-white">
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default InventoryItem;
