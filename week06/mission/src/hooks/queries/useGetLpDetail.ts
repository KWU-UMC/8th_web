import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lp";
import type { ApiResponse, TResponseLpDetail } from "../../types/TLp";

export const useGetLpDetail = (id: string) => {
  return useQuery<ApiResponse<ApiResponse<TResponseLpDetail>>, Error>({
    queryKey: ["lpDetail", id],
    queryFn: () => getLpDetail(id),
  });
};
