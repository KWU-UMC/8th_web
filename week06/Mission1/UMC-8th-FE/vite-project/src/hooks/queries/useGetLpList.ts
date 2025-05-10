import { useQuery } from "@tanstack/react-query";
import { PaginationDto } from "../../types/common";
import { getLPList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({cursor, search, order, limit}:PaginationDto){
    return useQuery({
        queryKey:[QUERY_KEY.lps], //사람들마다 key가 다름
        queryFn:() => 
            getLPList({
            cursor,
            search,
            order,
            limit,
        }),
        //data가 신선하다고 간주하는 시간 -> 이 시간 동안 캐시된 데이터를 그대로 사용함
        //컴포넌트가 마운트되거나 창에 포커스 들어오는 경우도 재요청 x
        //자주 사용되어야하는 데이터는 이게 큼
        //네트워크 요청이 크면 이게 큰게 나음
        staleTime: 1000*60*5, //5분
        // 사용되지 않는 비활성 상태 인 쿼리 데이터가 캐시에 남아있는 시간,
        // StaleTime이 지나고 데이터가 신선하지 않더라도 일정 시간 메모리에 보관
        // 그 이후에 해당 쿼리가 전혀 사용되지 않으면 gcTime이 지난 후에 제거함
        //10분동안 사용되지 않으면 삭제되며 새로운 요청 시, 다시 받아온다는 의미
        //너무 길면 x 
        gcTime: 100*60*10, //10분
        
        //조건에 따라 쿼리를 실행 여부 제어하는 것
        //false면 전혀 lps 가 동작하지 않음,
        //true면 동작하는거임
        //search가 있는 경우 true, 없는 경우 false
        enabled:Boolean(search),
    });
}

export default useGetLpList;