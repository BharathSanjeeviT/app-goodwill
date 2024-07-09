import { useSession } from '@utils/AuthContext';
import React from 'react';
import { Text } from 'react-native';

export default function App() {
  const { signIn } = useSession();
  return (
    <Text>
      Signout
    </Text>
  )
}