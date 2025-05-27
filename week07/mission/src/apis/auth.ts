import {
  RequestSigninDto, //회원가입 요청
  RequestSignupDto, //로그인 요청
  ResponseMyInfoDto, //내 정보 조회 응답
  ResponseSigninDto, //로그인 응답
  ResponseSignupDto, //회원가입 응답
} from "../types/auth";
//type alias를 불러와서 사용한다.
//type alias는 타입스크립트에서 타입을 정의하는 방법 중 하나이다.

import { axiosInstance } from "./axios";

export const postSignup = async (
  body: RequestSignupDto
): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signup", body);
  return data;
};

export const postSignin = async (
  body: RequestSigninDto
): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signin", body);
  return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get("/v1/users/me");

  return data;
};

export const postLogout = async () => {
  const { data } = await axiosInstance.post("/v1/auth/signout");
  return data;
};
