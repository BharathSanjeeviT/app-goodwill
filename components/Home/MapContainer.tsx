import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const MapContainer = () => {
  return (
    <View className="h-2/5 w-full flex flex-row bg-white">
      <View className="basis-6/12 w-full">
        <View className="py-5 pl-3">
          <TouchableOpacity className="bg-[#8e8e8e] h-full w-full rounded-lg">
          </TouchableOpacity>
        </View>
      </View>
      <View className="basis-6/12 w-full px-5 flex gap-1 py-4">
        <Text className="text-2xl font-bold pb-2">
          Site Name
        </Text>
        <Text className="text-lg font-semibold">
          Address Lane 1
        </Text>
        <Text className="text-lg font-semibold">
          Address Lane 2
        </Text>
        <Text className="text-lg font-semibold">
          Area
        </Text>
        <Text className="text-lg font-semibold">
          City
        </Text>
        <Text className="text-lg font-semibold mb-2">
          Pincode
        </Text>
        <TouchableOpacity className='bg-[#ff8731] flex justify-center items-center py-3 rounded-lg w-full'>
          <Text className='font-semibold text-xl text-white '>
            Open map
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default MapContainer;
