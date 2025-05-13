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
    //staleTime은 데이터가 신선한 상태로 유지되는 시간
    //데이터가 신선한 상태로 유지되는 시간 동안에는 캐시된 데이터를 그대로 사용
    //컴포넌트가 마운트되거나 창에 포커스가 들어오는 경우에도 refetch하지 않음
    //5분동안 기존 데이터를 그대로 활용해서 네트워크 요청을 줄인다.
    gcTime: 1000 * 60 * 10, // 10분
    //사용되지 않는 (비활성 상태)인 쿼리 데이터가 캐시에 남아있는 시간
    //staleTime이 지나고 데이터가 신선하지 않더라도, 일정 시간 동안 메모리에 보관
    //그 이후에 해당 쿼리가 전혀 사용되지 않으면 gcTime이 지난 후에 삭제됨 (garbage collection)
    //ex) 10분동안 사용되지 않으면 해당 캐시 데이터가 삭제되어, 다시 요청시 새로운 데이터를 받아오게 한다.
    //staleTime이 네트워크 요청을 줄이는 역할을 한다면, gcTime은 메모리 사용량을 줄이는 역할을 한다.
    //enabled는 쿼리를 실행할지 여부를 결정하는 옵션
    //search가 있을 때만 쿼리를 실행하도록 설정
    // enabled: Boolean(search),
    // 조건에 따라 쿼리를 실행할지 여부를 결정하는 옵션
    // refetchInterval: 10 * 1000,
    // 쿼리 데이터가 신선하지 않은 상태에서 주기적으로 refetch하는 옵션
    // 주로 실시간 데이터 업데이트가 필요한 경우에 사용
    // retry: 3,
    // 쿼리 실패 시 재시도 횟수
    // 기본값은 3회이며, 0으로 설정하면 재시도하지 않음
    // initialData는 쿼리 실행 전 미리 제공할 초기 데이터를 설정함
    // 컴포넌트가 렌더링 될 때 빈 데이터 구조를 미리 제공해서, 로딩 전에도 안전하게 UI를 구성
    // initialData: initialLpData,

    // keepPreviousData: true, //this keeeps the previous data while loading new data

    select: (data) => data.data.data,
    // select는 쿼리 결과에서 필요한 데이터만 선택하여 반환하는 옵션
  });
}

export default useGetLpList;
// useGetLpList 훅을 사용하여 LP 리스트를 가져온다.
// import useGetLpList from "./hooks/useGetLpList";
