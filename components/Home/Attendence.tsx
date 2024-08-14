import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSession, useSite } from '@utils/store';
import axios from 'axios';
import { API_URL } from '@utils/config';
import * as Location from 'expo-location';

const Attendence = () => {
  const { attendenceStatus, setAttendenceStatus } = useSite()
  const [loading, setLoading] = useState(false)
  const { uid } = useSession()
  const markAttendence = async () => {
    setLoading(true)
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
      let { coords } = await Location.getCurrentPositionAsync({});
      console.log(coords)
      const { data } = await axios.post(`${API_URL}/attendance/mark`, {
        u_id: "40a046a8-7297-4a71-ada3-99a35e3b8618",
        lat: "170",
        lng: "170"
      })
      console.log(data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className='flex w-full justify-center items-center p-3'>
      <TouchableOpacity className='w-full bg-[#ff8731] rounded-lg'
        onPress={markAttendence}
      >
        <View>
          {
            loading ?

              <View className='flex flex-row justify-center items-center'>
                <Text className='text-xl text-center text-white py-4 font-semibold mr-1'> Loading... </Text>
              </View> :
              <View>
                {
                  attendenceStatus === null ?
                    <View className='flex flex-row justify-center items-center'>
                      <Text className='text-xl text-center text-white py-4 font-semibold mr-1'> Mark Attendence </Text>
                      <AntDesign name="questioncircle" size={24} color="white" />
                    </View> :
                    attendenceStatus ?
                      <View className='flex flex-row justify-center items-center'>
                        <Text className='text-xl text-center text-white py-4 font-semibold mr-1'> Attendence Marked </Text>
                        <AntDesign name="checkcircle" size={24} color="white" />
                      </View> :
                      <View className='flex flex-row justify-center items-center'>
                        <Text className='text-xl text-center text-white py-4 font-semibold mr-1'> Close Attendence </Text>
                        <AntDesign name="clockcircle" size={24} color="white" />
                      </View>
                }
              </View>
          }
        </View>
      </TouchableOpacity>
    </View>
  )
}
export default Attendence;
