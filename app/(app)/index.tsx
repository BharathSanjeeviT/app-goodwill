import { useSession } from '@utils/authStore';
import React from 'react';

import { Pressable, Text } from 'react-native';
export default function App() {
  const { uid, signIn } = useSession()
  return (
    <Pressable
      onPress={() => {
        signIn(null)
      }}
      style={{
        marginTop: 100
      }}
    >
      <Text>Hello {uid}</Text>
    </Pressable>
  )
}
