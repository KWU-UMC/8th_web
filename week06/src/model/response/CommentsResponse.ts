import {Response} from "./Response.ts";
import {Comment} from "../Comment.ts";

export type CommentsResponse = Response<CommentData>

export type CommentData = {
    hasNext: boolean,
    nextCursor: string | null,
    data: Comment[]
}
