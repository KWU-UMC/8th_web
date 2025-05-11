import { useInfiniteQuery } from "@tanstack/react-query";
import type { TPagination } from "../../types/TLp";
import type { TResponseLpList } from "../../types/TLp";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({ search, order, limit }: Omit<TPagination, "cursor">) {
  return useInfiniteQuery<TResponseLpList, Error>({
    queryKey: [QUERY_KEY.lps, search, order, limit],
    queryFn: async ({ pageParam = 0 }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 지연
      return getLpList({
        cursor: pageParam as number,
        search,
        order,
        limit,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 3,
  });
}

export default useGetLpList;
