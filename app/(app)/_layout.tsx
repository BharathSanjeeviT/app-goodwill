import { useSession } from "@utils/store";
import { Redirect, Slot } from "expo-router";
import { SafeAreaView, Text } from 'react-native';

const Root = () => {
  const { uid, loading } = useSession()

  if (loading) {
    return (
      <Text>
        Loading
      </Text>
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
