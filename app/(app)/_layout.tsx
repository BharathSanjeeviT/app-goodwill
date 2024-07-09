import { useSession } from "@utils/AuthContext"
import { Redirect, Stack } from "expo-router"
import { Text } from "react-native";

const AppLayout = () => {
    const { loading, session } = useSession();

    if(loading){
        return <Text>Loading...</Text>
    }

    if(!session){
        return <Redirect href="/login"/>
    }else{
        return <Stack/>
    }

}
export default AppLayout;