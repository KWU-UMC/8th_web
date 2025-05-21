import { ResponseMyInfoDto } from "./auth";

export type CommentResponseDto = {
id: number;
content: string;
lpId: number;
authorId: number;
createdAt: string;
updatedAt: string;
author: ResponseMyInfoDto;
}

export type CommentPaginationResponse = {
  data: CommentResponseDto[];
  nextCursor: number;
  hasNext: boolean;
}

export type CommentListResponseDto = {
  status: boolean;
  statusCode: number;
  message: string;
  data: CommentPaginationResponse;
}

export type CreateCommentDto = {
  content: string;
}

export type UpdateCommentDto = {
  content: string;
}

export type CommentResponse = {
  status: boolean;
  statusCode: number;
  message: string;
  data: CommentResponseDto;
}