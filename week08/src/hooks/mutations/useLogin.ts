import { useMutation } from "@tanstack/react-query";
import { UserSigninInformation } from "../../utils/validate";
import { postSignin } from "../../apis/auth";

function useLogin() {
  return useMutation({
    mutationFn: (values: UserSigninInformation) => postSignin(values),
  });
}
export default useLogin;
