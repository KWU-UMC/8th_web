import { GetCommentListReqDto, postCommentRequestDto, ResponseCommentListDto } from "../types/comment";
import { axiostInstance } from "./axios";

export const getCommnetList = async(lpId: number, getCommentList: GetCommentListReqDto): Promise<ResponseCommentListDto> => {
    const{data} = await axiostInstance.get(`v1/lps/${lpId}/comments`,
        {params: getCommentList});

    return data;
}

export const postComment = async(lpId: number, comment: postCommentRequestDto): Promise<Comment> => {
    const{data} = await axiostInstance.post(`/v1/lps/${lpId}/comments`, comment);
    return data;
}