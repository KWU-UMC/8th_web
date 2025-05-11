import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";
import { ResponseLpListDto } from "../../types/lp";

function useGetInfiniteList(limit: number, search: string, order: PAGINATION_ORDER) {
  return useInfiniteQuery<
    ResponseLpListDto,
    Error,
    ResponseLpListDto,
    (string | undefined)[],
    number | undefined 
  >({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: ({ pageParam }) =>
      getLpList({ cursor: pageParam, limit, search, order }),

    initialPageParam: undefined,

    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetInfiniteList;
