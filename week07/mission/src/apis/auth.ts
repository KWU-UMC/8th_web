import {
    RequestSigninDto,
    RequestSignupDto,
    ResponseSigninDto,
    ResponseSignupDto,
    ResponseMyInfoDto,
    UpdateUserDto,
 } from "../types/auth.ts";
import { axiosInstance } from "./axios.ts";

export const postSignup = async (body: RequestSignupDto):Promise<ResponseSignupDto> => {
    const { data } = await axiosInstance.post("/v1/auth/signup", body,);

    return data;
};

export const postSignin = async (body: RequestSigninDto):Promise<ResponseSigninDto> => {
    const { data } = await axiosInstance.post("/v1/auth/signin", body,);

    return data;
};

export const getMyInfo = async ():Promise<ResponseMyInfoDto> => {
    const {data} = await axiosInstance.get("/v1/users/me");

    return data;
}

export const postLogout = async() => {
    const {data} = await axiosInstance.post("/v1/auth/signout");

    return data;
}

export const updateMyInfo = async (body: UpdateUserDto) => {
  const { data } = await axiosInstance.patch("/v1/users", body);
  return data;
};

export const deleteUser = async () => {
  return await axiosInstance.delete("/v1/users");
};