import { deleteCommentResponseDto, GetCommentListReqDto, patchCommentRequestDto, postCommentRequestDto, ResponseCommentListDto } from "../types/comment";
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

export const patchComment = async(lpId: number, commentId: number, comment: patchCommentRequestDto) : Promise<Comment> => {
    const{data} = await axiostInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`,comment);
    return data;
}

export const deleteComment = async(lpId: number, commentId: number): Promise<deleteCommentResponseDto> => {
    const{data} = await axiostInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);

    return data;
}