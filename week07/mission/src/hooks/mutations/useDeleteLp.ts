// hooks/mutations/useDeleteLp.ts
import { useMutation } from "@tanstack/react-query";
import { deleteLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

function useDeleteLp(lpId: number) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteLp(lpId),

    onSuccess: () => {
      alert("삭제 완료!");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps], // 또는 QUERY_KEY.lps
      });
      navigate("/"); // ✅ 훅 내부에서 바로 이동
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error(
        "삭제 실패 상세 로그:",
        error.response?.data || error.message
      );
      alert("삭제 실패ㅠㅠ");
    },
  });
}

export default useDeleteLp;
