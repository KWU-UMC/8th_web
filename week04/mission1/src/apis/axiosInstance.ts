import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
  baseURL: import.meta.env.VITE_API_URL, 
});

export { axiosInstance };