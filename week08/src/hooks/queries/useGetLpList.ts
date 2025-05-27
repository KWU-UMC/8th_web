import { useQuery } from "@tanstack/react-query";
import { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

// const initialLpData: ResponseLpListDto = {
//   status: true,
//   statusCode: 200,
//   message: "success",
//   data: {
//     data: [],
//   },
//   nextCursor: 0,
//   hasNext: false,
// };

function useGetLpList({ cursor, limit, search, order }: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: () =>
      getLpList({
        cursor,
        limit,
        search,
        order,
      }),
    staleTime: 1000 * 60 * 5, // 5분
    // staleTime은 쿼리 데이터가 신선하다고 간주되는 시간
    // 이 시간이 지나면 쿼리 데이터가 신선하지 않다고 간주되어 다시 요청을 보냄
    gcTime: 1000 * 60 * 10, // 10분
    // gcTime은 쿼리 데이터가 메모리에서 제거되는 시간
    // 이 시간이 지나면 쿼리 데이터가 메모리에서 제거됨

    select: (data) => data.data.data,
    // select는 쿼리 결과에서 필요한 데이터만 선택하여 반환하는 옵션
  });
}

export default useGetLpList;
// useGetLpList 훅을 사용하여 LP 리스트를 가져온다.
// import useGetLpList from "./hooks/useGetLpList";
