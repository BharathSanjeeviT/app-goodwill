import React, { useEffect, useState, useCallback } from "react";
import NavBar from "@components/NavBar"
import { View, ScrollView, Text, TouchableOpacity } from "react-native"
import AttendenceEntry from "@components/Attendence-Log/EntryComp"
import { API_URL } from "@utils/config";
import axios from "axios";
import { useSession } from "@utils/store";
import { AttendanceRecord } from '@utils/types';
import ModalChangeAttendence from "@components/Attendence-Log/ModalChangeAttendence"

const AttendenceLogComp = () => {
  const { uid } = useSession()

  const [from, setFrom] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date;
  });

  const [to, setTo] = useState(() => new Date());
  const [show, setShow] = useState(false);
  const [data, setData] = useState<Array<AttendanceRecord>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const { data } = await axios.post(`${API_URL}/attendance/get`, {
          u_id: uid,
          start_date: from,
          end_date: to
        })
        if (data.attendance.length > 0) {
          setData(data.attendance)
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <View className="h-[100vh] w-[100vw] bg-[#ede3da] pt-20">
      <NavBar link="Attendence Log" />
      <Text className="text-center text-2xl font-semibold my-2">
        History
      </Text>
      <Text className="text-center my-1">
        From {from.toDateString()} to {to.toDateString()}
      </Text>
      {show && <ModalChangeAttendence from={from} to={to} setFrom={setFrom} setTo={setTo} CloseModal={() => setShow(false)} setData={setData} />}
      <TouchableOpacity className="bg-[#ff9b00] p-2 mx-5 my-2 rounded-lg"
        onPress={() => setShow(true)}
      >
        <Text className="text-center my-1">
          Change Date
        </Text>
      </TouchableOpacity>
      {loading ? <Text className="text-center text-2xl font-semibold my-2">Loading...</Text> :
        data.length === 0 ? <Text className="text-center text-2xl font-semibold my-2">No Data Found</Text> :
          <ScrollView>
            {data.map((ele, idx) => (
              <AttendenceEntry key={idx} {...ele} />
            ))}
          </ScrollView>
      }
    </View>
  )
}
export default AttendenceLogComp;

