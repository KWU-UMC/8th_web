import { PaginationDto } from "../types/common";
import { ResponseLpDetailDto, ResponseLpListDto } from "../types/lp";
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
