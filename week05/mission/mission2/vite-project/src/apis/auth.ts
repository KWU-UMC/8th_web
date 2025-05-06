import axios from "axios";
import { Login, LP } from "../types/auth_type";
import { getRefreshToken, setNewRefreshToken } from "./token";

const authAPI = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
authAPI.interceptors.response.use(
  (response) => {
    console.log("valid access token");
    return response;
  },
  async (error) => {
    console.log("invalid access token");
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("get a new access token");
        const refreshToken = getRefreshToken();
        const newAccessTokenResponse = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
          { refresh: refreshToken }
        );
        setNewRefreshToken(newAccessTokenResponse.data.data.refreshToken);
        const newAccessToken = newAccessTokenResponse.data.data.accessToken;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return authAPI(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh AccessToken: ", refreshError);
        return Promise.reject("refreshToken is invalid");
      }
    }

    return Promise.reject(error);
  }
);

export const auth = {
  login: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Login | undefined> => {
    const url = `${import.meta.env.VITE_BASE_URL}/auth/signin`;

    try {
      const { data } = await axios.post(url, {
        email,
        password,
      });

      return data;
    } catch (error) {
      console.error("api request error: ", error);
    }
  },

  checkAccessTokenValid: async (
    accessToken: string
  ): Promise<any | undefined> => {
    try {
      const response = await authAPI.get("/auth/protected", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response;
    } catch (error) {
      console.error("api request error: ", error);
    }
  },

  newLP: async ({
    accessToken,
    title,
    content,
    imgUrl,
    tags,
    published,
  }: {
    accessToken: string;
    title: string;
    content: string;
    imgUrl: string;
    tags: string[];
    published: boolean;
  }): Promise<LP | undefined> => {
    const url = `${import.meta.env.VITE_BASE_URL}/lps`;

    try {
      const { data } = await axios.post(
        url,
        {
          title,
          content,
          imgUrl,
          tags,
          published,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      return data;
    } catch (error) {
      console.error("api request error: ", error);
    }
  },
};
