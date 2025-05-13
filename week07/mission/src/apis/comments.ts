import { LpComment, CommentListResponseDto } from "../types/comment";
import { axiosInstance } from "./axios";


export const getCommentsByLpId = async (lpId: string): Promise<LpComment[]> => {
  const { data } = await axiosInstance.get<CommentListResponseDto>(`/v1/lps/${lpId}/comments`);
  return Array.isArray(data.data.data) ? data.data.data : [];
};
