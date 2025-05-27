import { CreateCommentDto, CommentResponseDto, UpdateCommentDto } from "../types/comment";
import { axiosInstance } from "./axios";


export const getCommentsByLpId = async (lpId: string, cursor: number = 0) => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments?cursor=${cursor}`);
  return data.data;
};

export const postComment = async (lpId: string, commentdata: CreateCommentDto): Promise<CommentResponseDto> => {
  const token = localStorage.getItem("accessToken");

  const { data } = await axiosInstance.post<CommentResponseDto>(
    `/v1/lps/${lpId}/comments`,
    commentdata,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};


export const updateComment = async (
  lpId: string,
  commentId: number,
  dto: UpdateCommentDto
): Promise<CommentResponseDto> => {
  const { data } = await axiosInstance.patch<CommentResponseDto>(
    `/v1/lps/${lpId}/comments/${commentId}`,
    dto
  );
  return data;
};

export const deleteComment = (lpId: string, commentId: number) => {
  return axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
};
