// hooks/mutations/useUpdateLp.ts
import { useMutation } from "@tanstack/react-query";
import { patchLp } from "../../apis/lp";

export const useUpdateLp = (lpId:number) => {
  return useMutation({
    mutationFn: () => patchLp(lpId),
  });
};
