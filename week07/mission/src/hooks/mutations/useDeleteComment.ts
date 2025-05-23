import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../apis/comment";
import { QUERY_KEY } from "../../constants/key";

const useDeleteComment = (lpId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteComment({ lpId, commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.comments, lpId] });
    },
  });
};

export default useDeleteComment;
