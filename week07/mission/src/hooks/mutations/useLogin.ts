import { useMutation } from "@tanstack/react-query";
import { postSignin } from "../../apis/auth";
import { RequestSigninDto } from "../../types/auth";
import { useLocalStorage } from "../useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../../constants/key";

const useLogin = () => {
  const { setItem: setAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

  return useMutation({
    mutationFn: (body: RequestSigninDto) => postSignin(body),
    onSuccess: (res) => {
      const { accessToken, refreshToken } = res.data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      alert("로그인 성공");
      window.location.href = "/";
    },
    onError: (err) => {
      console.error("로그인 실패", err);
      alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    },
  });
};

export default useLogin;
