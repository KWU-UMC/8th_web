import { useMutation } from "@tanstack/react-query";
import { CreateLpRequest } from "../../types/lp";
import { createLP } from "../../apis/lp";

export const usePostLp = () => {
  return useMutation({
    mutationFn: (lp: CreateLpRequest) => createLP(lp),
  });
};
