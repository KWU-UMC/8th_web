export interface LpComment {
  id: number;
  content: string;
  createdAt: string;
  author: {
    id: number;
    name: string;
  };
}

export interface CommentPaginationResponse {
  data: LpComment[];
  nextCursor: number;
  hasNext: boolean;
}

export interface CommentListResponseDto {
  status: boolean;
  statusCode: number;
  message: string;
  data: CommentPaginationResponse;
}
