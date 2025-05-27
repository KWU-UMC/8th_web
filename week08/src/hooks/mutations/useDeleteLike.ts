import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { Likes, ResponseLpDetailDto } from "../../types/lp";
import { ResponseMyInfoDto } from "../../types/auth";

function useDeleteLike() {
  return useMutation({
    mutationFn: deleteLike,

    onMutate: async (lp) => {
      //1. 이 게시글에 관련된 쿼리를 취소
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lpDetail, lp.lpId],
      });
      //2. 현재 게시글의 데이터를 캐시에서 가져와 변경할 준비
      const previousLpPost = queryClient.getQueryData<ResponseLpDetailDto>([
        QUERY_KEY.lpDetail,
        lp.lpId,
      ]);
      //게시글 데이터를 복사해서 NewLpPost라는 새로운 객체를 만들어낼것임
      //복사하는 가장 큰 이유는 나중에 오류가 발생했을 때 이전 상태로 되돌리기 위해서이다.

      const NewLpPost = { ...previousLpPost };

      const me = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);

      const userId = Number(me?.data.id);
      const likeIndex =
        previousLpPost?.data.likes.findIndex(
          (like) => like.userId === userId
        ) ?? -1;
      // 이 부분은 좋아요를 누른 유저의 인덱스를 찾는 부분이다.
      // 만약 좋아요를 누른 유저가 없다면 -1을 반환한다.
      if (likeIndex >= 0) {
        previousLpPost?.data.likes.splice(likeIndex, 1);
        //splice는 배열에서 특정 요소를 제거하는 메서드이다.
        //이 경우에는 좋아요를 누른 유저의 인덱스를 찾아서 그 인덱스부터 1개의 요소를 제거한다.
        //즉, 좋아요를 누른 유저의 정보를 삭제하는 것이다.
      } else {
        const newLike = { userId, lpId: lp.lpId } as Likes;
        previousLpPost?.data.likes.push(newLike);
      }
      //업데이트 된 게시글 데이터를 캐시에 저장
      //이렇게 하면 UI가 바로 업데이트된다.
      //사용자가 변화를 확인할 수 있다.

      queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], NewLpPost);

      return { previousLpPost, NewLpPost };
    },
    onError: (err, newLp, context) => {
      console.log(err, newLp);
      queryClient.setQueryData(
        [QUERY_KEY.lpDetail, newLp.lpId],
        context?.previousLpPost?.data.id
      );
    },
    onSettled: async (_data, _error, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variables.lpId],
      });
    },
  });
}

export default useDeleteLike;
