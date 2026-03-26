import axios from "axios";
import { getAccessToken, setAccessToken } from "../services/authTokenService";

const api = axios.create({
  baseURL: "https://localhost:7145/api",
  withCredentials: true,
});

const refreshApi = axios.create({
  baseURL: "https://localhost:7145/api",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest.retryRequest) {
      originalRequest.retryRequest = true;

      try {
        const response = await refreshApi.post(
          "/auth/refresh",
          {},
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const newToken = response.data?.token;
        setAccessToken(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch {
        setAccessToken(null);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
