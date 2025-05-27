// hooks/mutations/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { postSignin } from "../../apis/auth";
import { RequestSigninDto } from "../../types/auth";

export const useLogin = () => {
    return useMutation({
        mutationFn: (body: RequestSigninDto) => postSignin(body),
    });
};
