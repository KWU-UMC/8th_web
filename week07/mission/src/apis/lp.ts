import type {
  TPagination,
  TResponseLpDetail,
  TResponseLpList,
} from "../types/TLp";
import { axiosInstance } from "./axiosInstance";
import type { ApiResponse } from "../types/TLp";

export const getLpList = async (
  Tpagination: TPagination
): Promise<TResponseLpList> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: {
      cursor: Tpagination.cursor,
      limit: Tpagination.limit,
      order: Tpagination.order,
      search: Tpagination.search,
    },
  });

  return data;
};

export const getLpDetail = async (
  id: string
): Promise<ApiResponse<ApiResponse<TResponseLpDetail>>> => {
  const response = await axiosInstance.get(`/v1/lps/${id}`);
  return { data: response.data };
};
