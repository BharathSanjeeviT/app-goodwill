import React, { useEffect, useState, useCallback } from "react";
import NavBar from "@components/NavBar";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import AttendenceEntry from "@components/Attendence-Log/EntryComp";
import { API_URL } from "@utils/config";
import axios from "axios";
import { getstartend, useSession } from "@utils/store";
import { AttendanceRecord } from "@utils/types";
import ModalChangeAttendence from "@components/Attendence-Log/ModalChangeAttendence";

const AttendenceLogComp = () => {
  const { uid } = useSession();

  const { start, end } = getstartend(new Date(Date.now()));
  const [from, setFrom] = useState(new Date(start));
  const [to, setTo] = useState(new Date(end));

  const [show, setShow] = useState(false);
  const [data, setData] = useState<Array<AttendanceRecord>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const body = {
          token: uid,
          start_date: from.toLocaleDateString(),
          end_date: to.toLocaleDateString(),
        };
        console.log(body);
        const { data } = await axios.post(`${API_URL}/attendance/get`, body);
        if (data.attendance.length > 0) {
          setData(data.attendance);
        }
				console.log(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View className="h-[100vh] w-[100vw] bg-[#ede3da] pt-20">
      <NavBar link="Attendence Log" />
      <Text className="text-center text-2xl font-semibold my-2">History</Text>
      <Text className="text-center my-1">
        From {from.toDateString()} to {to.toDateString()}
      </Text>
      {show && (
        <ModalChangeAttendence
          from={from}
          to={to}
          setFrom={setFrom}
          setTo={setTo}
          CloseModal={() => setShow(false)}
          setData={setData}
        />
      )}
      <TouchableOpacity
        className="bg-[#ff9b00] p-2 mx-5 my-2 rounded-lg"
        onPress={() => setShow(true)}
      >
        <Text className="text-center my-1">Change Date</Text>
      </TouchableOpacity>
      {loading ? (
        <Text className="text-center text-2xl font-semibold my-2">
          Loading...
        </Text>
      ) : data.length === 0 ? (
        <Text className="text-center text-2xl font-semibold my-2">
          No Data Found
        </Text>
      ) : (
        <ScrollView>
          {data.map((ele, idx) => (
            <AttendenceEntry key={idx} {...ele} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};
export default AttendenceLogComp;
