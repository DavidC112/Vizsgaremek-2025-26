
export const setAccessToken = (token:string | null) => {
    if (token) {
       localStorage.setItem("accessToken", token);
    } else {
        localStorage.removeItem("accessToken");
    }
}

export const getAccessToken = (): string | null => {
    return localStorage.getItem("accessToken") || null;
}