import axios from "axios";
import { CheckAccessTokenValid, Login } from "../types/auth_type";

export const auth = {
  login: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Login | undefined> => {
    const url = `${import.meta.env.VITE_BASE_URL}/signin`;

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
  ): Promise<CheckAccessTokenValid | undefined> => {
    const url = `${import.meta.env.VITE_BASE_URL}/protected`;

    try {
      const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return data;
    } catch (error) {
      console.error("api request error: ", error);
    }
  },
};
