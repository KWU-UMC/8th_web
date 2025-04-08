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