import { useProduct, useUpdatedProducts, useChangedProducts } from "@utils/store"
import React, { useState } from "react"
import { Text, TextInput, TouchableOpacity, View, Pressable, ToastAndroid } from "react-native"

const UpdateInventoryModal = ({ setOpenModal }: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
}) => {
  const { name, id, quantity } = useProduct()
  const { changedOnes, addChangedOne } = useChangedProducts();
  const { updateItem } = useUpdatedProducts()
  const [loading, setLoading] = useState(false)
  const [newquan, setNewquan] = useState("")
  const submit = async () => {
    setLoading(true)
    setTimeout(() => {
      setOpenModal(false)
      updateItem(id, parseInt(newquan))
      setLoading(false)
      if(quantity !== parseInt(newquan)){
        addChangedOne(id, parseInt(newquan))
      }
      ToastAndroid.show("Prodcut updated sucessfully", ToastAndroid.SHORT)
    }, 3000)
  }
  return (
    <Pressable className="absolute top-20 left-0 right-0 bottom-0 z-10 w-full h-full flex justify-center items-center bg-[#00000050]"
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
            editable={!loading}
            value={newquan}
          />
        </View>

        <TouchableOpacity
          className="bg-[#fc8019] flex justify-center items-center py-3 rounded-lg"
          onPress={() => submit()}
          disabled={loading}
        >
          <Text className="text-lg text-white font-semibold">
            {loading ? "Updating" : "Update"}
          </Text>
        </TouchableOpacity>
      </Pressable>
    </Pressable>
  )
}
export default UpdateInventoryModal;
