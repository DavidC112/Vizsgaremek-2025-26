import { useState, useEffect, createContext, useContext } from "react";
import { setAccessToken  as setAxiosToken} from "../services/authTokenService";
import { loginUser, logoutUser, type LoginResult } from "../services/auth";

export type LoginResponse = {
    error?: string
} 

export type AuthContextType = {
    accessToken: string | null,
    login: (email: string, password: string) => Promise<LoginResponse>,
    logout: () => void,
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    const ctx = useContext(AuthContext);

    if (!ctx){
        throw new Error("useAuthContext must be used within AuthContextProvider");
    }

    return ctx;
}

const AuthContextProvider = (props: {children: React.ReactNode}) => {
    const [accessToken, setAccessToken] = useState<string | null>(null)

    const login = async (email: string, password: string): Promise<LoginResponse> => {
        const result: LoginResult = await loginUser(email, password)
        setAxiosToken(result.token?? null)
        setAccessToken(result.token?? null)
        
        if(!result.error) {return {}}
        return {error: result.error}
    }

    const logout = async () => {
        try {
            await logoutUser()
        }finally {
            setAccessToken(null)
            setAxiosToken(null)
        }
    }

    useEffect(() => {
        console.log("AuthContextProvider accessToken changed:", accessToken);
    }, [accessToken]);

    return (
        <AuthContext.Provider value={{accessToken,login, logout}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider