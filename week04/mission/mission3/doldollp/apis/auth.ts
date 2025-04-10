import axios, { AxiosResponse } from "axios";

interface SignupI {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export async function signup(): Promise<AxiosResponse<SignupI> | undefined> {
  const email = window.localStorage.getItem("email");
  const password = window.localStorage.getItem("password");
  const nickname = window.localStorage.getItem("nickname");

  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/signup`,
      {
        email,
        password,
        name: nickname,
      }
    );

    return data;
  } catch (error) {
    console.error("API request error: ", error);
  }
}

export function signin() {}
