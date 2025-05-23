// src/hooks/queries/useGetInfiniteComments.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getCommentList } from "../../apis/comment";
import { OrderType } from "../../enum/common";

function useGetInfiniteComments(lpId: number, order: OrderType) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.comments, lpId, order],
    queryFn: ({ pageParam = 0 }) =>
      getCommentList({ lpId, cursor: pageParam, limit: 10, order }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      // ✅ nextCursor가 존재할 때만 다음 페이지로 판단
      return lastPage.data.nextCursor ?? undefined;
    },
    staleTime: 1000 * 60, // optional: 1분간 캐시 유지
  });
}

export default useGetInfiniteComments;
