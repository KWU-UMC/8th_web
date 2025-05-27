import { likeResponseDto } from "../types/like";
import { axiostInstance } from "./axios";

export const postLike = async(lpId: number): Promise<likeResponseDto> => {
    const{data} = await axiostInstance.post(`/v1/lps/${lpId}/likes`);
    
    return data;
}

export const deleteLike = async(lpId: number): Promise<likeResponseDto> => {
    const{data} = await axiostInstance.delete(`v1/lps/${lpId}/likes`);

    return data;
}