import axios from "axios";
import { CheckAccessTokenValid, Login, LP } from "../types/auth_type";

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
  ): Promise<CheckAccessTokenValid | undefined> => {
    const url = `${import.meta.env.VITE_BASE_URL}/auth/protected`;

    try {
      const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return data;
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
