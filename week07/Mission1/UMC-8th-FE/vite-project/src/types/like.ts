import { CommonResponse } from "./common";

export type like = {
    id: number;
    userId: number;
    lpId: number;
}

export type likeResponseDto = CommonResponse<like>;
