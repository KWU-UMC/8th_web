import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editComment } from "../../apis/comment";
import { QUERY_KEY } from "../../constants/key";

const useEditComment = (lpId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: number;
      content: string;
    }) => editComment({ lpId, commentId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.comments, lpId] });
    },
  });
};

export default useEditComment;
