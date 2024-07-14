import { useSession } from "@utils/authStore";
import { Pressable, Text } from "react-native";

const Login = () => {
  const { uid, signIn } = useSession()
  return (
    <Pressable
      onPress={() => {
        signIn("hello")
      }}
      style={{
        marginTop: 100
      }}
    >
      <Text>Login {uid}</Text>
    </Pressable>
  )
}

export default Login;
