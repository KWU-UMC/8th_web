// src/apis/user.ts
import { axiosInstance } from "./axios";

export interface PatchUserInfoDto {
  name: string;
  bio?: string;
  avatar?: string;
}

export const patchUserInfo = async (payload: PatchUserInfoDto) => {
  const { data } = await axiosInstance.patch("/v1/users", payload);
  return data;
};
