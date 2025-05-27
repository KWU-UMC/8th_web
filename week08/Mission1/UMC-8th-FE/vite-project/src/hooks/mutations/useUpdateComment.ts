import { useMutation } from "@tanstack/react-query";
import { patchCommentRequestDto } from "../../types/comment";
import { patchComment } from "../../apis/comment";

export const useUpdateComment = () => {
  return useMutation({
    mutationFn: ({ lpId, commentId, body }: { lpId: number; commentId: number; body: patchCommentRequestDto }) =>
      patchComment(lpId, commentId, body),
  });
};
