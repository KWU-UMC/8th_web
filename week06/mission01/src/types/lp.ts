import { CursorBasedResponse } from "./common";

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

// LP 리스트 응답 타입
export type ResponseLpListDto = CursorBasedResponse<{
  data: {
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
  }[];
}>;
