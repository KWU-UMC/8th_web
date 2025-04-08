import { axiosInstance } from "./axiosInstance";

export const postSignin = async (email: string, password: string) => {
    const response = await axiosInstance.post("/v1/auth/signin", {
    email,
    password,
  });
  return response;
};