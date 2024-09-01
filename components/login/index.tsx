import { ScrollView, View } from "react-native";
import { LoginForm } from "./LoginForm";
import { LoginLogo } from "./LoginLogo";
import { DetailsModal } from "./DetailsModal";
import { useState } from "react";

const Login = () => {
	const [details, setDetails] = useState(false);
	const [uid, setUid] = useState("");
	return (
		<ScrollView>
			<View className="flex justify-between items-center h-[100vh] w-[100vw]">
				{details && <DetailsModal uid={uid} />}
				<LoginLogo />
				<LoginForm setDetails={setDetails} setUid={setUid} />
			</View>
		</ScrollView>
	);
};

export default Login;
