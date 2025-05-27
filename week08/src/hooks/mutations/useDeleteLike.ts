import { queryClient } from "./../../App";
import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { ResponseLpDto } from "../../types/lp";
import { ResponseMyInfoDto } from "../../types/auth";

function useDeleteLike() {
  return useMutation({
    mutationFn: deleteLike,
    onMutate: async (lp) => {
      //1.게시글에 관련된 쿼리를 취소
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lps, lp.lpid],
      });

      //2.현재 게시글의 데이터를 캐시에서 가져온다.
      const previousLpPost = queryClient.getQueryData<ResponseLpDto>([
        QUERY_KEY.lps,
        lp.lpid,
      ]);
      //3.게시글 데이터를 복사해서 NewLpPost라는 새로운 객체를 만들어줌 복사하는 이유는 나중에 오류가 발생했을때 이전 상태로 되돌리기 위해서
      const newLpPost = { ...previousLpPost };

      //게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 좋아요 위치를 찾아야함
      const me = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myinfo,
      ]);
      const userId = Number(me?.data.id);

      const likedindex =
        previousLpPost?.data.likes.findIndex(
          (like) => like.userId === userId
        ) ?? -1;
      if (likedindex >= 0) {
        previousLpPost?.data.likes.splice(likedindex, 1);
      } else {
        const newLike = { userId, lpId: lp.lpid } as any;
        previousLpPost?.data.likes.push(newLike);
      }
      //업데이트된 게시글 데이터를 캐시에 저장
      //이렇게하면 UI가 바로 업데이트된다.
      queryClient.setQueryData([QUERY_KEY.lps, lp.lpid], newLpPost);

      return { previousLpPost, newLpPost };
    },
    onError: (err, newLp, context) => {
      console.log(err, newLp);
      queryClient.setQueryData(
        [QUERY_KEY.lps, newLp.lpid],
        context?.previousLpPost?.data.id
      );
    },
    //onSettled 는 API 요청이 끝난후 성공하든 실패하든 실행
    onSettled: async (data, error, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variables.lpid],
      });
    },
  });
}
export default useDeleteLike;
