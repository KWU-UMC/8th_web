import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";
import { useLocalStorage } from "../useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../../constants/key";
import { useNavigate } from "react-router-dom";

const useDeleteUser = () => {
  const navigate = useNavigate();
  const { removeItem: removeAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { removeItem: removeRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.delete("/v1/users");
      return data;
    },
    onSuccess: () => {
      removeAccessToken();
      removeRefreshToken();
      alert("탈퇴가 완료되었습니다.");
      navigate("/login");
    },
    onError: (error) => {
      console.error("탈퇴 중 오류 발생:", error);
      alert("탈퇴에 실패했습니다.");
    },
  });
};

export default useDeleteUser;
