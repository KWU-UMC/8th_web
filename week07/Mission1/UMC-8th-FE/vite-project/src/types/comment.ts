import { PAGINATION_ORDER } from "../enums/common"
import { CursorBasedResponse } from "./common"

export type Comment = {
    id : number,
    content: string,
    lpId: number,
    authorId: number,
    createdAt: string,
    updatedAt: string,
    author: {
        id: number,
        name: string,
        email: string,
        bio?: string,
        avatar: string,
        createdAt: string,
        updatedAt: string,
    }
}

export type ResponseCommentListDto = CursorBasedResponse<Comment[]>

export type GetCommentListReqDto = {
    cursor?: number,
    limit?: number,
    order?: PAGINATION_ORDER,
}

export type postCommentRequestDto = {
    content: string
}