import type {
  TPagination,
  TResponseLpDetail,
  TResponseLpList,
} from "../types/TLp";
import { axiosInstance } from "./axiosInstance";
import type { ApiResponse, TAddLpData } from "../types/TLp";

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

export const patchLpDetail = async (
  id: string,
  updatedData: Partial<TResponseLpDetail>
) => {
  const { data } = await axiosInstance.patch(`/v1/lps/${id}`, updatedData);
  return data;
};

export const deleteLpDetail = async (id: string) => {
  const { data } = await axiosInstance.delete(`/v1/lps/${id}`);
  return data;
};

export const addLp = async (lpData: TAddLpData): Promise<TResponseLpDetail> => {
  const { data } = await axiosInstance.post("/v1/lps", lpData);
  return data;
};
