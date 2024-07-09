import { useSession } from "@utils/AuthContext";
import { router } from "expo-router";
import React from "react";
import { Text } from "react-native"

const Login = () => {
    const { session, signIn  } = useSession();
    console.log("4. ", session)
    return (
        <Text
            onPress={ () => {
                signIn('Hellp')
                router.push('/')
            }}
            style={{
                marginTop: 100
            }}
        >
            SignIn
        </Text>
    )
}

export default Login;