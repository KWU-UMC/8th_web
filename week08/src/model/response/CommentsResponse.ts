import type {Response} from "./Response.ts";
import type {Comment} from "../Comment.ts";

export type CommentsResponse = Response<CommentData>

export type CommentData = {
    hasNext: boolean,
    nextCursor: string | null,
    data: Comment[]
}
