import axios from "axios"
import { LOCAL_STORAGE_KEY } from "../constants/key";

export const axiostInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)}`,
    },
});