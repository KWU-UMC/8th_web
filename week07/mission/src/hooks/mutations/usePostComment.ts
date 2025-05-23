import { useMutation } from "@tanstack/react-query";
import { postComment } from "../../apis/comment";
import { QUERY_KEY } from "../../constants/key";
import { queryClient } from "../../App";
import { RequestCommentDto } from "../../types/comment";

const usePostComment = () => {
  return useMutation({
    mutationFn: (dto: RequestCommentDto) => postComment(dto),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comments, variables.lpId],
      });
    },
  });
};

export default usePostComment;
