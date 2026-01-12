import axios from "axios";
import { tokenStorage } from "../utils/tokenStorage";

export const api = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1/",
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = tokenStorage.getAccessToken();

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERR:", error);
    return Promise.reject(error);
  }
);
