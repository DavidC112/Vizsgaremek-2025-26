import api from "../api/axios";
import { setAccessToken } from "./authTokenService";

export type TokenResponse = {
    token: string
}

export type LoginResult = {
    token?: string,
    error?: string,
    
}

export const loginUser = async (email: string, password: string): Promise<LoginResult> => {
    try {
         const response = await api.post<TokenResponse>(
        `/api/auth/login`,
        { email, password }
    );

    setAccessToken(response.data.token);

    return {token: response.data.token} 
    } catch (error) {
        //TODO: better error handling
        console.error("Login error:", error);
        return {error: error instanceof Error ? error.message : String(error)};
    }
};

export const logoutUser = async () => {
    await api.post("/api/auth/logout", {}, {withCredentials: true})
    localStorage.removeItem("accessToken");
}