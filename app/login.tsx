import React  from 'react';
import { ScrollView, View } from 'react-native';
import { LoginLogo, LoginForm } from '@components/login'

export default function App() {

  return (
    <ScrollView>
      <View
        className='flex justify-center items-center h-[100vh] w-[100vw]'
      >
        <LoginLogo/>
        <LoginForm/>
      </View>
    </ScrollView>
  )
}
