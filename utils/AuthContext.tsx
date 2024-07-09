import React, { PropsWithChildren, createContext, useContext } from "react";
import { useStorage } from "./useStorage";

type UserType = {
    signIn: ( _ : string) => void;
    session : string | null;
    loading : boolean;
}

//create context for the login information
const AuthContext = createContext<UserType>({
    signIn: (string) => null,
    session : null, 
    loading : true
})

//to fetch the user's context information
const useSession = () => {
    return useContext<UserType>(AuthContext);
}

//provider that provides information throughout the session
const SessionProvider = ({children} : PropsWithChildren) => {
    const [
        [ session, loading ],
        setSession
    ] = useStorage('broker');
    return(
        <AuthContext.Provider
            value={{
                signIn: (token: string | null) => {
                    setSession(token)
                },
                session,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export {
    SessionProvider,
    useSession
};