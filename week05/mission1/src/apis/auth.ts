import { axiosInstance } from "./axiosInstance";
import { TSignupPayload } from "../types/TSignup";

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
  const {data} = await axiosInstance.post("/v1/auth/signout");
  return data;
}

export const getMyinfo = async () => {
  try {
    const { data } = await axiosInstance.get("/v1/users/me");
    console.log("User data: ", data); // 데이터를 제대로 받아왔는지 확인
    return data;
  } catch (error) {
    console.error("Failed to fetch user data: ", error);
    throw error;
  }
}