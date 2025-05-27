import { useQuery } from "@tanstack/react-query";
import { PaginationDto } from "../../types/common";
import { getLPList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
//import { ResponseLPListDto } from "../../types/lp";

// const initialLPListData: ResponseLPListDto = {
//     status:true,
//     statusCode:200,
//     message:"",
//     data: {
//         data:[],

//     },
//     nextCursor:0,
//     hasNext: false,
// };

function useGetLpList({cursor, search, order, limit}:PaginationDto){
    return useQuery({
        queryKey:[QUERY_KEY.lps,search,order], //사람들마다 key가 다름
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
        //enabled:Boolean(search),

        //ex. 주식 데이터 -> 변동이 큼
        //10초마다 업데이트 됐으면 좋겠다.라는 의미
        //refetchInterval: 100*60,

        //retry : query 요청이 실패했을 때 자동으로 재시도할 횟수를 지정함
        //기본값 3회정도, 네트워크 오류도 임시적인 문제를 보완가능
        //여기에 처리도 좋지만 app.tsx 에 가서 default 옵션 넣는것도 좋음(app.tsx에 가보면 코드 있음)

        //initialData: 쿼리 실행 전 미리 제공할 초기 데이터를 설정함
        //component가 랜더링될 때 패딩 중이라 빈 데이터가 들어오는데
        //이때 빈 데이터를 미리 초기값으로 해줘서 빈 데이터가 들어오더라도 로딩 전에 안전하게 UI를 구성할 수 있게 하는 애임
        //initialData:initialLPListData,

        //파라미터가 변경될 때 이전 데이터를 유지하여 UI 깜빡임(Flikcking)을 줄여줌
        //ex) 페지네이션 시 페이지 전환 사이에 이전 데이터를 보여주어 사용자 경험을 향상시킴.
        //keepPreviousData: 

        //이러면 data.data.map 하던걸 data.map으로 줄일 수 있게됨
        //select: (data) => data.data.data //로 안의 내용까지 가져올 수 있게 됨
    });
}

export default useGetLpList;