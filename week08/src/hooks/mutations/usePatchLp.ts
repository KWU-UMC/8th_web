import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { patchLp } from "../../apis/lp";
import { queryClient } from "../../App";

function usePatchLp(lpId: number) {
  return useMutation({
    mutationFn: (updateData: {
      title: string;
      content: string;
      thumbnail: string;
      tags: string[];
      published: boolean;
    }) => patchLp({ lpId, updateData }),
    onSuccess: () => {
      alert("수정 완료!");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpDetail, lpId],
      });
    },
    onError: () => {
      alert("수정 실패ㅠㅠ");
    },
  });
}

export default usePatchLp;
