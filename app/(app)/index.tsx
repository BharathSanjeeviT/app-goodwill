import { useSession } from '@utils/authStore';
import React from 'react';
import { View, Text, Pressable } from 'react-native';

const Home = () => {
  const { uid, signIn } = useSession()
  return (
    <View>
      <Text>
        {uid}
      </Text>
      <Pressable
        onPress={ () => signIn("") }
      >
        <Text>
          SignOUT
        </Text>
      </Pressable>
    </View>)
}
export default Home;

