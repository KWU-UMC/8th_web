import { PaginationDto } from "../types/common";
import {
  CreateLpDto,
  PatchLpDto,
  RequestLpDto,
  ResponseLikeDto,
  ResponseLpDetailDto,
  ResponseLpListDto,
} from "../types/lp";
import { axiosInstance } from "./axios";

// LP 리스트 조회 (커서 기반)
export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("v1/lps", {
    params: paginationDto, // 쿼리스트링 형식으로 요청
  });
  return data;
};

export const getLpDetail = async (lpId: number) => {
  const { data } = await axiosInstance.get<ResponseLpDetailDto>(
    `v1/lps/${lpId}`
  );
  return data;
};

export const postLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeDto> => {
  const { data } = await axiosInstance.post(`v1/lps/${lpId}/likes`);
  return data;
};

export const deleteLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeDto> => {
  const { data } = await axiosInstance.delete(`v1/lps/${lpId}/likes`);
  return data;
};

export const createLp = async (lp: CreateLpDto) => {
  const { data } = await axiosInstance.post("/v1/lps", lp);
  return data;
};

// 수정
export const patchLp = async ({
  lpId,
  updateData,
}: {
  lpId: number;
  updateData: PatchLpDto;
}) => {
  const { data } = await axiosInstance.patch(`/v1/lps/${lpId}`, updateData);
  return data;
};

// 삭제
export const deleteLp = async (lpId: number) => {
  const accessToken = localStorage.getItem("accessToken");

  console.log("삭제 요청 보낼 토큰:", accessToken);

  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};
