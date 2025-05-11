import type { TPagination, TResponseLpList } from "../types/TLp";
import { axiosInstance } from "./axiosInstance";

export const getLpList = async (
  Tpagination: TPagination
): Promise<TResponseLpList> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: Tpagination,
  });

  return data;
};
