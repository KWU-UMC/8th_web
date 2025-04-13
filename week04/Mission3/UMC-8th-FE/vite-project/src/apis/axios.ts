import axios from "axios"

export const axiostInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
});