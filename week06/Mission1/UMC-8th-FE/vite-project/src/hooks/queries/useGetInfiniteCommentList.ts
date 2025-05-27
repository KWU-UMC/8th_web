import { useInfiniteQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "../../constants/key"
import { getCommnetList } from "../../apis/comment"
import { PAGINATION_ORDER } from "../../enums/common";

function useGetInifiniteCommentList(lpId : number, order: PAGINATION_ORDER){
    
    return useInfiniteQuery({
        queryKey: [QUERY_KEY.comments, lpId, order],
        queryFn: ({pageParam = 0}) => getCommnetList(lpId, {cursor: pageParam, limit: 10, order,}),
        initialPageParam: 0,
            getNextPageParam: (lastPage) => {
                return lastPage.data.hasNext? lastPage.data.nextCursor: undefined;
            },
    });
}

export default useGetInifiniteCommentList;