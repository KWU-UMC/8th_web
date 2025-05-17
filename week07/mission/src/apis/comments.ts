import { CreateCommentDto, CommentResponseDto } from "../types/comment";
import { axiosInstance } from "./axios";


export const getCommentsByLpId = async (lpId: string, cursor: number = 0) => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments?cursor=${cursor}`);
  return data.data;
};

export const postComment = async (
  lpId: string,
  commentDto: CreateCommentDto
): Promise<CommentResponseDto> => {
  const token = localStorage.getItem("accessToken");

  const { data } = await axiosInstance.post<CommentResponseDto>(
    `/v1/lps/${lpId}/comments`,
    commentDto,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};