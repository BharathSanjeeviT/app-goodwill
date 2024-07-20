import React, { useState } from "react";
import { Text, View, TextInput, Pressable, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { Loader } from "@components/LottieLoading"
import { useSession } from "@utils/authStore";
import { useRouter } from "expo-router";

export const LoginForm = () => {

  const [id, setId] = useState('');
  const [pass, setPass] = useState('')
  const [checking, setChecking] = useState(false)

  const { signIn } = useSession()
  const router = useRouter()

  const handleSubmit = (id: string, pass: string) => {
    if (!id || !pass) {
      ToastAndroid.show("ID or Password cannot be null", ToastAndroid.SHORT)
    } else {
      setChecking(true)

      //API call to check the password
      let login;
      setTimeout(() => {
        setChecking(false)
        login = true;
        if (!login) {
          ToastAndroid.show("Password Wrong try again", ToastAndroid.SHORT)
        } else {
          signIn(id)
          router.push("/")
        }
      }, 3000)

    }
  }

  return (
    <View
      className='w-full bg-[#f8d7bf] rounded-t-[50px] items-center py-16'
    >
      {checking && <Loader/>}
      <KeyboardAvoidingView behavior='height' className='w-full gap-8 items-center'>
        <View className='w-10/12 gap-y-3'>
          <Text className='text-lg font-semibold'>
            User Id
          </Text>
          <TextInput
            className='p-3 text-lg rounded-xl bg-white'
            editable={!checking}
            placeholder='Username'
            onChangeText={setId}
            value={id}
          />
        </View>
        <View className='w-10/12 gap-y-3'>
          <Text className='text-lg font-semibold'>
            Password
          </Text>
          <TextInput
            className='p-3 text-lg rounded-xl bg-white'
            editable={!checking}
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={setPass}
            value={pass}
          />
        </View>
        <Pressable
          onPress={() => handleSubmit(id, pass)}
          disabled={checking}
          className='w-10/12 rounded-xl mt-3 px-2 py-3 bg-[#ff8731]'
        >
          <Text className='text-xl text-center text-white font-semibold'>
            Submit
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
}
