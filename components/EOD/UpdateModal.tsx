import { useProduct, useUpdatedProducts, useChangedProducts } from "@utils/store"
import React, { useState } from "react"
import { Text, TextInput, TouchableOpacity, View, Pressable } from "react-native"

const UpdateInventoryModal = ({ setOpenModal }: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
}) => {
  const { name, id, quantity } = useProduct()
  const { changedOnes, addChangedOne } = useChangedProducts();
  const { updateItem } = useUpdatedProducts()
  const [newquan, setNewquan] = useState("")
  const submit = async () => {
    setOpenModal(false)
    if (quantity !== parseInt(newquan) && parseInt(newquan) !== 0) {
      addChangedOne(id, parseInt(newquan))
      updateItem(id, parseInt(newquan))
    }
    console.log(changedOnes)
  }
  return (
    <Pressable className="absolute top-20 left-0 right-0 bottom-0 z-20 w-full h-screen flex justify-center items-center bg-[#00000050]"
      onPress={() => setOpenModal(false)}
    >
      <Pressable className="flex bg-white rounded-lg py-8 px-6">
        <View className="items-center justify-center flex">
          <Text className="font-semibold text-xl">
            Update {name}
          </Text>
        </View>
        <View className="flex flex-row justify-center items-center pt-6 pb-5">
          <TextInput
            className='p-3 text-lg bg-[#fff8f3] rounded-lg w-24 mx-3'
            keyboardType="number-pad"
            placeholder="00000"
            maxLength={5}
            onChangeText={setNewquan}
            value={newquan}
          />
        </View>

        <TouchableOpacity
          className="bg-[#fc8019] flex justify-center items-center py-3 rounded-lg"
          onPress={() => submit()}
        >
          <Text className="text-lg text-white font-semibold">
            Update
          </Text>
        </TouchableOpacity>
      </Pressable>
    </Pressable>
  )
}
export default UpdateInventoryModal;
