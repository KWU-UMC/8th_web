import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { ResponseMyInfoDto } from "../../types/auth";
import { patchUserInfo, PatchUserInfoDto } from "../../apis/patchUserInfo";

function usePatchUserInfo() {
  return useMutation({
    mutationFn: patchUserInfo,
    onMutate: async (newUserInfo: PatchUserInfoDto) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });

      const previousUserInfo = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);

      // 낙관적 UI 업데이트
      queryClient.setQueryData(
        [QUERY_KEY.myInfo],
        (old: ResponseMyInfoDto) => ({
          ...old,
          data: {
            ...old.data,
            ...newUserInfo,
          },
        })
      );

      return { previousUserInfo };
    },
    onError: (_err, _newData, context) => {
      if (context?.previousUserInfo) {
        queryClient.setQueryData([QUERY_KEY.myInfo], context.previousUserInfo);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },
  });
}

export default usePatchUserInfo;
