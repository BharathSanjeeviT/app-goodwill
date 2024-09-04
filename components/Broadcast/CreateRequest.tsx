import { Picker } from "@react-native-picker/picker";
import { API_URL } from "@utils/config";
import { useSite } from "@utils/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ReqModal = ({
  closeModal,
  quantity,
  setQuantity,
  submit,
  product,
  setProduct,
}: {
  closeModal: () => void;
  quantity: string;
  setQuantity: React.Dispatch<React.SetStateAction<string>>;
  submit: () => void;
  product: string;
  setProduct: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { site_id } = useSite();
  const [products, setProducts] = useState<Array<string>>([]);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        console.log(site_id);
        const { data } = await axios.post(`${API_URL}/inventory`, {
          s_id: site_id,
        });
        setProducts(
          data.inventory.map((item: { product: string }) => item.product),
        );
        console.log(data.inventory);
      } catch (err) {
        console.log(err);
      } finally {
        setLoad(false);
      }
    })();
  }, []);

  return (
    <Pressable className="absolute top-20 left-0 right-0 bottom-0 z-10 w-full h-screen flex justify-center items-center bg-[#00000050]">
      {load ? (
        <Text>Loading..</Text>
      ) : (
        <Pressable className="bg-white py-3 px-3 z-20 rounded-lg">
          <View className="flex flex-col">
            <View className="flex flex-row justify-center items-center pb-4 pt-2">
              <Text className="px-2">Quantity</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-2 py-1 w-9/12"
                inputMode="decimal"
                value={quantity}
                onChangeText={setQuantity}
              />
            </View>
            <View className="flex flex-row justify-center items-center pb-4 pt-2">
              <Text className="px-2">Product</Text>
              <View className="w-9/12 px-2 rounded-lg mx-3 border">
                <Picker
                  selectedValue={product}
                  onValueChange={(itemValue) => setProduct(itemValue)}
                >
                  {products.map((item, idx) => {
                    return (
                      <Picker.Item
                        label={item}
                        value={item}
                        key={`${item}-${idx}`}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
          </View>
          <TouchableOpacity
            className="bg-blue-500 p-2 rounded-lg"
            onPress={submit}
          >
            <Text className="text-white text-center py-2">Request</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-red-500 p-2 rounded-lg my-3"
            onPress={closeModal}
          >
            <Text className="text-white text-center py-2">Close</Text>
          </TouchableOpacity>
        </Pressable>
      )}
    </Pressable>
  );
};
export default ReqModal;
