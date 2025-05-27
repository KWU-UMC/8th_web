import { useMutation } from "@tanstack/react-query";
import { deleteComment } from "../../apis/comment";

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: ({ lpId, commentId }: { lpId: number; commentId: number }) => deleteComment(lpId,commentId),
  });
};
