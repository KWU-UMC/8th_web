import {
  RequestSigninDto,
  ResponseMyInfoDto,
  ResponseSigninDto,
  ResponseSignupDto,
} from "./../types/auth";
import { RequestSignupDto } from "../types/auth";
import { axiosInstance } from "./axios";

export const postSignup = async (
  body: RequestSignupDto
): Promise<ResponseSignupDto> => {
  try {
    const response = await axiosInstance.post("/v1/auth/signup", body);
    return response.data;
  } catch (error: any) {
    // 서버에서 Conflict 발생 (예: 중복 이메일)
    if (error.response?.status === 409) {
      throw new Error("이미 존재하는 이메일입니다."); // 사용자에게 보여줄 에러 메시지
    }
    throw new Error("회원가입 중 오류가 발생했습니다.");
  }
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
