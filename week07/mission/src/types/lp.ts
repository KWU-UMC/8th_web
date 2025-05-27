import { CommonResponse, CursorBasedResponse } from "./common";

// 태그 정보
export type Tag = {
  id: number;
  name: string;
};

// 좋아요 정보
export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Likes[];
};

export type RequestLpDto = {
  lpId: number;
};

// LP 리스트 응답 타입
export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

// export type CursorBasedResponse<T> = CommonResponse<{
//   data: T;
//   nextCursor: number | null;
//   hasNext: boolean;
// }>;

// LP 상세 응답 타입
export type ResponseLpDetailDto = CommonResponse<Lp>;

// export type CommonResponse<T> = {
//   status: boolean;
//   statusCode: number;
//   message: string;
//   data: T;
// };

export type ResponseLikeDto = CommonResponse<{
  id: number;
  userId: number;
  lpId: number;
}>;

export type CreateLpDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
};

export type PatchLpDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
};
