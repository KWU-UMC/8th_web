import { axiosInstance } from "./axios";
import { OrderType } from "../enum/common"; // enum 경로에 따라 조정

export const getCommentList = async ({
  lpId,
  cursor,
  limit,
  order,
}: {
  lpId: number;
  cursor: number;
  limit: number;
  order: OrderType; // ✅ enum 기반 타입 적용!
}) => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: { cursor, limit, order },
  });
  return data;
};
