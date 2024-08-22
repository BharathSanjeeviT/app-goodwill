import { useSite } from '@utils/store';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const MapContainer = () => {
  const { attendenceStatus } = useSite()
  const router = useRouter()
  return (
    <View className="w-full flex p-5">
      <Text className='text-5xl my-1 pt-10'>
        Welcome Back,
      </Text>
      <Text className='text-md'>
        {attendenceStatus === null ?
          'Please visit a site and mark your attendance.' :
          attendenceStatus ? 'Attendence Marked for today!' :
            'Please close the attendence for today.'
        }
      </Text>
      <TouchableOpacity
        className='w-full bg-blue-500 rounded-lg flex flex-row justify-center items-center py-4 mt-5'
        onPress={() => {
          router.push('/sites')
        }}
      >
        <Text className='text-lg text-white'>
          View Sites of Goodwill
        </Text>
      </TouchableOpacity>
    </View>
  )
}
export default MapContainer;
