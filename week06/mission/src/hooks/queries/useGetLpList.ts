import { useQuery } from "@tanstack/react-query";
import type { TPagination } from "../../types/TLp";
import type { TResponseLpList } from "../../types/TLp";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({ cursor, search, order, limit }: TPagination) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, cursor, search, order, limit],
    queryFn: () =>
      getLpList({
        cursor,
        search,
        order,
        limit,
      }),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 100 * 60 * 10, // 10분
    retry: 3,
    select: (data: TResponseLpList) => data.data.data,
    // enabled: Boolean(search), // 조건에 따라 쿼리 실행 여부 제어
  });
}

export default useGetLpList;
