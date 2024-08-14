import { API_URL } from "@utils/config";
import { useSession, useSite } from "@utils/store";
import axios from "axios";
import { Redirect, Slot } from "expo-router";
import { Pressable, SafeAreaView, Text } from 'react-native';

const Root = () => {
  const { uid, loading } = useSession()
  const { site_id, setInfo } = useSite()

  //site_id: string | null,
  //attendenceStatus: boolean | null,
  //is_super: boolean | null,
  //setAttendenceStatus : (status : boolean) => void,
  //setInfo: (site_id: string, attendenceStatus: boolean | null, is_super: boolean) => void,

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

  //change to uid for login
  if (uid) {
    (async () => {
      if (site_id === null) {
        try {
          const { data } = await axios.post(`${API_URL}/attendance/status`, {
            u_id: "40a046a8-7297-4a71-ada3-99a35e3b8618"
          });
        } catch (err) {
          console.log(err)
        }
        setInfo("40a046a8-7297-4a71-ada3-99a35e3b8618", true, true)
      }
    })();
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
