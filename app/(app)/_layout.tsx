import { useSession } from "@utils/authStore";
import { Redirect, Slot } from "expo-router";
import { Pressable, SafeAreaView, Text } from 'react-native';

const Root = () => {
  const { uid, loading } = useSession()

  if (loading) {
    return (
      <Pressable
        onPress={() => {
          console.log(uid)
        }}
        style={{
          marginTop: 500
        }}
      >
        <Text>
          Loading
        </Text>
      </Pressable >
    )
  }

  if (uid) {
    return (
      <SafeAreaView>
        <Slot />
      </SafeAreaView>
    )
  } else {
    return <Redirect href="/login" />
  }
}
export default Root;
