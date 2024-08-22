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
      if (attendenceStatus) {
        alert("Attendence already marked")
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
      let { coords } = await Location.getCurrentPositionAsync({});
      console.log(coords)
      const { data } = await axios.post(`${API_URL}/attendance/mark`, {
        token: uid,
        lat: coords.latitude,
        lng: coords.longitude
      })
      console.log(data)
      if (attendenceStatus === null) {
        setAttendenceStatus(false)
      } else if (!attendenceStatus) {
        setAttendenceStatus(true)
      }
      alert("Attendence Marked")
    } catch (err: any) {
      if (err.response.status === 401) {
        alert("You are not in the range of any site")
      }else if (err.response.status === 400) {
        alert("Please wait for 8 hours to close the attendence")
      }
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
