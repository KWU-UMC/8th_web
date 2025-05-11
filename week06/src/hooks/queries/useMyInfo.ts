import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../../apis/auth";

import { useAuth } from "../../context/AuthContext"; // accessToken 가져오기
import { ResponseMyInfoDto } from "../../types/auth";

export const useMyInfo = () => {
  const { accessToken } = useAuth();

  return useQuery<ResponseMyInfoDto["data"]>({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await getMyInfo();
      return res.data; // response.data.data 구조에 맞게 수정
    },
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
  });
};
