import React, { useState } from 'react';
import { Text, View, TextInput, Pressable, KeyboardAvoidingView, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {

  const [id, setId] = useState('');
  const [pass, setPass] = useState('')

  const handleSubmit = (id: string, pass: string) => {
    console.warn(id, pass)
  }

  return (
    <ScrollView>
      <View
        className='flex justify-center items-center h-[100vh] w-[100vw]'
      >
        <View
          className='basis-1/3 items-center justify-center'
        >
          <Text className='text-5xl'>
            Hola
          </Text>
        </View>
        <View
          className='w-full basis-2/3 bg-[#ccc] rounded-t-[50px] items-center justify-center'
        >
          <Text className='mb-10 text-2xl'>
            Enter your Login crendentials
          </Text>
          <KeyboardAvoidingView behavior='height' className='w-full gap-10 items-center'>
            <View className='w-10/12 gap-2'>
              <Text className='text-xl'>
                User Id
              </Text>
              <TextInput
                className='border p-3 text-lg rounded-xl'
                onSubmitEditing={() => handleSubmit(id, pass)}
                placeholder='Username'
                onChangeText={setId}
                value={id}
              />
            </View>
            <View className='w-10/12 gap-2'>
              <Text className='text-xl'>
                Password
              </Text>
              <TextInput
                className='border p-3 text-lg rounded-xl'
                placeholder='Password'
                secureTextEntry={true}
                onSubmitEditing={() => handleSubmit(id, pass)}
                onChangeText={setPass}
                value={pass}
              />
            </View>
            <Pressable
              onPress={() => handleSubmit(id, pass)}
              className='w-10/12 rounded-lg bg-white px-2 py-3'
            >
              <Text className='text-2xl text-center'>
                Submit
              </Text>
            </Pressable>
          </KeyboardAvoidingView>
        </View>
      </View>
    </ScrollView>
  )
}
