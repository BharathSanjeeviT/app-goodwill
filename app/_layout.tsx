import { Slot } from "expo-router";
import { SessionProvider } from "@utils/AuthContext"

const Root = () => {
    return (
        <SessionProvider>
            <Slot/>
        </SessionProvider>
    )
}
export default Root;