import { API_URL } from "@utils/config";
import axios from "axios";
import { useSession } from "@utils/store";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { Loader } from "@components/LottieLoading";

export const DetailsModal = ({ uid }: { uid: string }) => {
  const [anum, setAnum] = useState("");
  const [name, setName] = useState("");
  const [checking, setChecking] = useState(false);

  const { signIn } = useSession();

  const router = useRouter();

  const submitDetails = async () => {
    setChecking(true);
    const regex = /^[1-9][0-9]{11}$/;
    if (name! && anum!) {
      if (regex.test(anum)) {
        try {
          await axios.put(`${API_URL}/u/update`, {
            token: uid,
            adhaar_no: anum,
            name,
          });
          setChecking(false);
          signIn(uid);
          router.push("/");
        } catch (err: any) {
          setChecking(false);
          console.log(err.message);
        }
      } else {
        alert("Enter valid aadhar number");
        setChecking(false);
      }
    } else {
      alert("Please fill all the fields");
      setChecking(false);
    }
  };

  return (
    <View className="absolute top-0 left-0 bottom-0 z-10 w-[100vw] h-[100vh] flex justify-center items-center bg-[#00000050] px-3">
      {checking && <Loader content="loading..." />}
      <View className="bg-[#F7E7DC] w-full rounded-lg p-5 border-2 flex justify-center items-center">
        <KeyboardAvoidingView
          behavior="height"
          className="w-full gap-8 flex items-center justify-center"
        >
          <View className="gap-y-3 w-full">
            <Text className="text-lg font-semibold">Aadhar Number</Text>
            <TextInput
              className="text-lg bg-[#FFF8F3] border w-full p-3"
              keyboardType="decimal-pad"
              placeholder="Enter only number w/o hypen"
              value={anum}
              onChangeText={setAnum}
            />
          </View>
          <View className="gap-y-3 w-full">
            <Text className="text-lg font-semibold">Name</Text>
            <TextInput
              className="p-3 text-lg border bg-[#FFF8F3]"
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
            />
          </View>
          <Pressable
            onPress={submitDetails}
            disabled={checking}
            className="w-7/12 border-2 mt-3 px-1 py-3 bg-[#758694]"
          >
            <Text className="text-xl text-center text-white font-semibold">
              Submit
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};
