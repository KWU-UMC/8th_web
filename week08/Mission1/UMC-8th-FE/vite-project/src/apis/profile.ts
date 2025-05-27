import { PatchProfileRequestDto, ResponseMyInfoDto } from "../types/auth";
import { axiostInstance } from "./axios";

export const patchProfile = async(body: PatchProfileRequestDto): Promise<ResponseMyInfoDto> => {
    const{data} = await axiostInstance.patch(`/v1/users`, body);
    
    return data;
}