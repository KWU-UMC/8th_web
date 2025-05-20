import { PaginationDto } from "../types/common";
import { ResponseLpListDto, UpdateLpsDto } from "../types/lp";
import { axiosInstance } from "./axios";
import { CreateLpsDto } from "../types/lp";

export const getLpList = async ({cursor, limit, order,}: PaginationDto): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: { cursor, limit, order },
  });
  
  return data;
};

export const postLike = async (lpId: number) => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return data;
};

export const postUnlike = async (lpId: number) => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return data;
};

export const createLp = async (data: CreateLpsDto) => {
  const token = localStorage.getItem("accessToken");

  return axiosInstance.post("/v1/lps", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateLp = async (lpId: number, data: UpdateLpsDto) => {
  const token = localStorage.getItem("accessToken");

  return axiosInstance.patch(`/v1/lps/${lpId}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export const deleteLp = async (lpId: number) => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);
  return data;
}