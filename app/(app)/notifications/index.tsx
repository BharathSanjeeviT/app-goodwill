import { View, Text, ScrollView } from "react-native";
import Navbar from "@components/NavBar";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect, useState } from "react";
import { API_URL } from "@utils/config";
import axios from "axios";
import { NotificationType } from "@utils/types";
const Notification = () => {
  const [load, setLoad] = useState(true);
  const [data, setData] = useState<Array<NotificationType>>([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(`${API_URL}/notification`);
        setData(data.data.notifications);
        console.log(data.data.notifications);
      } catch (err) {
        console.log(err);
      } finally {
        setLoad(false);
      }
    })();
  }, []);
  return (
    <View className="min-h-screen bg-[#ede3da] flex justify-between items-center pt-24">
      <Navbar link="Notifications" />
      <Text>
        {load ? (
          "Fetching Details..."
        ) : data.length === 0 ? (
          <Text className="text-xl">No Notifications</Text>
        ) : (
          <ScrollView className="w-screen">
            {data.map(({ value, time, u_name }, idx) => (
              <View className="bg-white rounded-lg p-4 mx-4 mb-3 shadow-sm" key={idx}>
                <View className="flex-row items-center mb-2">
                  <View className="mr-2">
                    <AntDesign name="bells" size={22} color="black" />
                  </View>
                  <Text className="text-lg font-semibold flex-1">{value}</Text>
                </View>
                <View className="flex-row justify-between items-center mt-2">
                  <View className="flex-row items-center">
                    <View className="mr-2">
                      <AntDesign name="clockcircleo" size={22} color="black" />
                    </View>
                    <Text className="text-sm text-gray-500">
                      {new Date(time).toLocaleString()}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <View className="mr-2">
                      <AntDesign name="user" size={22} color="black" />
                    </View>
                    <Text className="text-sm text-gray-500">{u_name}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </Text>
    </View>
  );
};
export default Notification;
