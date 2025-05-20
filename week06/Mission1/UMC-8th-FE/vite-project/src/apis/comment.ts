import { GetCommentListReqDto, ResponseCommentListDto } from "../types/comment";
import { axiostInstance } from "./axios";

export const getCommnetList = async(lpId: number, getCommentList: GetCommentListReqDto): Promise<ResponseCommentListDto> => {
    const{data} = await axiostInstance.get(`v1/lps/${lpId}/comments`,
        {params: getCommentList});

    return data;
}