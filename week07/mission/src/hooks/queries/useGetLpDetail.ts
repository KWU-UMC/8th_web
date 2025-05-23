import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

export const useGetLpDetail = (lpId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.lpDetail, lpId],
    queryFn: () => getLpDetail(lpId),
    select: (res) => res.data,
    enabled: !!lpId,
  });
};
