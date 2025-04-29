import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
  console.log("Authorization Header: ", `Bearer ${token}`);
  if (token) {
    config.headers.Authorization = `Bearer ${token.replace(/"/g, '')}`;
  } else {
    console.warn("No accessToken found in localStorage");
  }
  return config;
});