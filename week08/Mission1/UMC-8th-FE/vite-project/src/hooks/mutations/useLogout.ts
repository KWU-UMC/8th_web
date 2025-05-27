// hooks/mutations/useLogout.ts
import { useMutation } from "@tanstack/react-query";
import { postLogout } from "../../apis/auth";

export const useLogout = () => {
  return useMutation({
    mutationFn: postLogout,
  });
};