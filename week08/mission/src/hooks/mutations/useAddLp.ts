import { useMutation } from "@tanstack/react-query";
import { addLp } from "../../apis/lp";

const useAddLp = () => {
  return useMutation({
    mutationFn: addLp,
  });
};

export default useAddLp;
