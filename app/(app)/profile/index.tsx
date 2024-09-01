import NavBar from "@components/NavBar";
import { useSession } from "@utils/store";
import { View, Text, TouchableOpacity } from "react-native";
const Profile = () => {
	const { signIn } = useSession()
  return (
    <View className="min-h-screen bg-[#ede3da] flex justify-between items-center pt-24">
      <NavBar link="Profile" />
      <TouchableOpacity 
				className="w-full bg-blue-500 rounded-lg flex flex-row justify-center items-center py-4 mt-5"
				onPress={() => signIn(null) }
			>
        <Text className="text-lg font-semibold text-white">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Profile;
