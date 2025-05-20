import { useMutation } from "@tanstack/react-query";
import { postComment } from "../../apis/comment";

export const usePostComment = (lpId: number) => {
  return useMutation({
    mutationFn: (body: { content: string }) => postComment(lpId, body),
  });
};