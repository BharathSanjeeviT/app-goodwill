import React, { SetStateAction, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import { Loader } from "@components/LottieLoading";
import { useRouter } from "expo-router";
import axios from "axios";
import { API_URL } from "@utils/config";
import { useSession } from "@utils/store";

export const LoginForm = ({
  setDetails,
  setUid,
}: {
  setDetails: React.Dispatch<SetStateAction<boolean>>;
  setUid: React.Dispatch<SetStateAction<string>>;
}) => {
  const { signIn } = useSession();
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [checking, setChecking] = useState(false);

  const handleSubmit = async (id: string, pass: string) => {
    if (!id || !pass) {
      ToastAndroid.show("ID or Password cannot be null", ToastAndroid.SHORT);
    } else {
      setChecking(true);
      try {
        const { data } = await axios.post(`${API_URL}/u/login`, {
          mobile: id,
          password: pass,
        });
        if (data?.user?.adhaar_no === null || data?.user?.adhaar_no === "") {
          setUid(data?.token);
          setDetails(true);
        } else {
          signIn(data?.token);
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status == 400) {
          alert("Password or Phone number doesnot match");
        }
        console.log(err);
      }
      setChecking(false);
    }
  };

  return (
    <View className="w-full bg-[#ede3da] border-4 items-center py-10">
      {checking && <Loader content="Verifying..." />}
      <KeyboardAvoidingView
        behavior="height"
        className="w-full gap-8 items-center"
      >
        <View className="w-10/12 gap-y-2">
          <Text className="text-lg font-semibold">Phone number</Text>
          <TextInput
            className="p-3 text-lg bg-[#fff8f3] rounded-lg"
            editable={!checking}
            keyboardType="phone-pad"
            placeholder="+91"
            onChangeText={setId}
            value={id}
          />
        </View>
        <View className="w-10/12 gap-y-2">
          <Text className="text-lg font-semibold">Password</Text>
          <TextInput
            className="p-3 text-lg bg-[#fff8f3] rounded-lg"
            editable={!checking}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={setPass}
            value={pass}
          />
        </View>
        <Pressable
          onPress={() => handleSubmit(id, pass)}
          disabled={checking}
          className="w-10/12 mt-3 px-2 py-3 bg-[#ff8732] rounded-lg"
        >
          <Text className="text-xl text-center text-white font-semibold">
            Submit
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};
