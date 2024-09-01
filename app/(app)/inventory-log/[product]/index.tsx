import NavBar from "@components/NavBar";
import { useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { PLogType, LogType } from "@utils/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@utils/config";
import { useSite, utcToIst } from "@utils/store";
import DateTimePicker from "@react-native-community/datetimepicker";

const Product = () => {
  const [load, setLoad] = useState(true);
  const [date, setDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() - 1)),
  );
  const [log, setLog] = useState<Array<LogType>>([]);
  const [plog, setPlog] = useState<Array<PLogType>>([]);
  const [closeFrom, setCloseFrom] = useState(false);
  const { site_id } = useSite();

  useEffect(() => {
    (async () => {
      try {
        console.log(date?.toLocaleDateString());
        console.log(site_id);
        const { data } = await axios.post(`${API_URL}/inventory/product`, {
          s_id: site_id,
          product,
          date: date.toLocaleDateString(),
        });
        setLog(data.log);
        console.log(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoad(false);
      }
    })();
  }, []);

  useEffect(() => {
    const groupedLogs: { [key: string]: Array<LogType> } = log.reduce(
      (acc, logEntry) => {
        if (!acc[logEntry.p_name]) {
          acc[logEntry.p_name] = [];
        }
        acc[logEntry.p_name].push(logEntry);
        return acc;
      },
      {} as { [key: string]: Array<LogType> },
    );
    const transformedPLog: Array<PLogType> = Object.keys(groupedLogs).map(
      (pname) => ({
        pname,
        logs: groupedLogs[pname].map((logEntry) => ({
          p_id: logEntry.p_id,
          quant: logEntry.quant,
          receive_time: logEntry.receive_time,
          sender_name: logEntry.sender_name,
          receiver_name: logEntry.receiver_name,
          receiver: logEntry.receiver,
          requested_time: logEntry.requested_time,
          sender: logEntry.sender,
        })),
      }),
    );
    setPlog(transformedPLog);
  }, [log]);

  const { product } = useLocalSearchParams();

  const getProductLog = async () => {
    try {
      setLoad(true);
      const { data } = await axios.post(`${API_URL}/inventory/product`, {
        s_id: site_id,
        product,
        date: date.toLocaleDateString(),
      });
      console.log(data);
      setLog(data.log);
    } catch (err) {
      console.log(err);
    } finally {
      setLoad(false);
    }
  };

  return (
    <View className="h-screen bg-[#ede3da] pt-20">
      <NavBar link="Inventory Product Log" />
      {load ? (
        <View className="flex items-center justify-center">
          <Text>Loading...</Text>
        </View>
      ) : (
        <>
          <View>
            <Text className="text-center text-lg font-semibold my-3">
              Inventory Log for {product} on{" "}
              {utcToIst(date.toString()).toLocaleDateString()}
            </Text>

            <TouchableOpacity
              className="bg-[#ff9b00] p-2 mx-5 my-2 rounded-lg"
              onPress={() => setCloseFrom(true)}
            >
              <Text className="text-center text-lg py-1">Change Date</Text>
            </TouchableOpacity>

            {closeFrom && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(date) => {
                  setDate(new Date(date.nativeEvent.timestamp));
                  setCloseFrom(false);
                  getProductLog();
                }}
              />
            )}
          </View>
          <View className="flex justify-center items-center my-5"></View>
          {plog.length === 0 ? (
            <View className="text-center text-lg font-semibold mb-3">
              <Text>No logs found</Text>
            </View>
          ) : (
            plog.map((item, idx) => (
              <View className="" key={idx}>
                <View className="">
                  {item.logs.map((log, idx) => {
                    return (
                      <View key={idx} className="bg-white my-1 rounded m-2">
                        <Text className="py-3 text-center">
                          {utcToIst(log.receive_time).toLocaleTimeString()}-{" "}
                          {log.quant} units{" "}
                          {log.sender === site_id
                            ? log.receiver_name !== null
                              ? `sent for ${log.receiver_name}`
                              : "used"
                            : log.sender_name !== null
                              ? `received from ${log.sender_name}`
                              : `imported`}{" "}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            ))
          )}
        </>
      )}
    </View>
  );
};
export default Product;
