import { axiosInstance } from "./axiosInstance";
import { type TSignupPayload } from "../types/TSignup";

export const postSignin = async (email: string, password: string) => {
  const response = await axiosInstance.post("/v1/auth/signin", {
    email,
    password,
  });
  return response;
};

export const postSignup = async (data: TSignupPayload) => {
  const response = await axiosInstance.post("/v1/auth/signup", data);
  return response;
};

export const postLogout = async () => {
  const { data } = await axiosInstance.post("/v1/auth/signout");
  return data;
};

export const getMyinfo = async () => {
  try {
    const { data } = await axiosInstance.get("/v1/users/me");
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const patchMyInfo = async (userInfo: {
  name: string;
  bio: string;
  avatar: string;
}) => {
  const response = await axiosInstance.patch("/v1/users", userInfo);
  return response.data;
};

export const deleteMyinfo = async () => {
  try {
    const { data } = await axiosInstance.delete("/v1/users");
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
