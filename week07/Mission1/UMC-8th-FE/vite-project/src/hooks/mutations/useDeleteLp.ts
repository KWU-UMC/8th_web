// hooks/mutations/useDeleteLp.ts
import { useMutation } from "@tanstack/react-query";
import { deleteLp } from "../../apis/lp";

export const useDeleteLp = (lpId: number) => {
  return useMutation({
    mutationFn: () => deleteLp(lpId),
  });
};
