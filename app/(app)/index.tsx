import { useEffect, useState } from 'react'
import { HomePage } from '@components/Home'
import { useSession, useSite } from '@utils/store'
import axios from 'axios'
import { API_URL } from '@utils/config'
import { View, Text } from 'react-native'
const Home = () => {

  const [fetching, setFetching] = useState(false)
  const { uid } = useSession()
  const { site_id, setInfo } = useSite()

  useEffect(() => {
    (async () => {
      if (site_id === null) {
        setFetching(true)
        console.log(uid)
        try {
          const { data } = await axios.post(`${API_URL}/attendance/status`, {
            token: uid
          });
          console.log(data)
          setInfo(data.status.s_id, data.status.attendanceStatus, data.status.isSuperUser)
        } catch (err) {
          console.log(err)
        } finally {
          setFetching(false)
        }
      }
    })();
  }, [])

  return (
    <View>
      {
        fetching ?
          <View className='min-h-screen bg-[#ede3da] flex justify-center items-center'>
            <Text className='text-xl'>
              Fetching Details...
            </Text>
          </View> :
          <HomePage />
      }
    </View>
  )

}
export default Home;

