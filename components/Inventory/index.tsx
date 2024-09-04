import React, { useState, useEffect } from "react";
import { ScrollView, TextInput, View, Text } from "react-native";
import InventoryItem from "@components/Inventory/InventoryItem";
import UpdateInventoryModal from "@components/Inventory/UpdateModal";
import AntDesign from "@expo/vector-icons/AntDesign";
import NavBar from "@components/NavBar";
import datum from "inventory-data.json";
import axios from "axios";
import { API_URL } from "@utils/config";
import { useSite } from "@utils/store";
import { Inventory } from "@utils/types";

const InventoryComp = () => {
  const [openModal, setOpenModal] = useState(false);
  const { site_id } = useSite();
  const [grep, setGrep] = useState("");
  const [data, setData] = useState<Array<Inventory>>([]);
  const [originalData, setOriginalData] = useState<Array<Inventory>>([]); // Store the original data

  useEffect(() => {
    (async () => {
      const { data } = await axios.post(`${API_URL}/inventory`, {
        s_id: site_id,
      });
      setData(data.inventory);
      setOriginalData(data.inventory);
    })();
  }, []);

  useEffect(() => {
    if (grep === "") {
      setData(originalData);
    } else {
      setData(
        originalData.filter((ele) =>
          ele.product.toLowerCase().includes(grep.toLowerCase()),
        ),
      );
    }
  }, [grep]);

  const addQuantityToData = (name: string, quan: number) => {
    setData((prev) =>
      prev.map((ele) => {
        if (ele.product === name) {
          if (ele.quantity + quan > 0) {
            return { ...ele, quantity: ele.quantity + quan };
          } else {
            return { ...ele, quantity: 0 };
          }
        }
        return ele;
      }),
    );
  };

  return (
    <View>
      {site_id === null ? (
        <View className="bg-[#ede3da] min-h-[100vh] pt-36 flex justify-center items-center">
          <NavBar link="Inventory" />
          <Text className="text-xl"> Go to Work! </Text>
        </View>
      ) : (
        <View className="bg-[#ede3da] min-h-[100vh] pt-36">
          <NavBar link="Inventory" />
          {openModal && (
            <UpdateInventoryModal
              setOpenModal={setOpenModal}
              addQuantityToData={addQuantityToData}
            />
          )}
          <View className="absolute top-20 left-0 w-full py-3 px-3 flex flex-row items-center justify-center z-10">
            <AntDesign name="search1" size={24} color="black" />
            <TextInput
              value={grep}
              onChangeText={(data) => {
                setGrep(data);
              }}
              className="w-10/12 px-3 bg-[#ffffff] rounded-lg ml-3 py-3 text-lg"
            />
          </View>
          <ScrollView>
            {data.map((ele, idx) => (
              <InventoryItem
                key={idx}
                setOpenModal={setOpenModal}
                itemData={ele}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};
export default InventoryComp;
