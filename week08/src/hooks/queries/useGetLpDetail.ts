import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

export const useGetLpDetail = (lpId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.lpDetail, lpId],
    //여기서는 QUERY_KEY.lpDetail과 lpId를 조합하여 쿼리 키를 생성합니다.
    //이렇게 하면, lpId가 변경될 때마다 새로운 쿼리가 생성되어 해당 LP의 상세 정보를 가져올 수 있습니다.
    queryFn: () => getLpDetail(lpId),
    select: (res) => res.data,
    enabled: !!lpId,
  });
};
