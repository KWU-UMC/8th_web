import { PaginationDto } from "../types/common";
import { CreateLpRequest, Lp, PatchLpDetailResponseDto, ResponseLpDetailDto, ResponseLPListDto } from "../types/lp";
import { axiostInstance } from "./axios";

export const getLPList = async(paginationDto: PaginationDto):Promise<ResponseLPListDto> => {
    const{data} = await axiostInstance.get('v1/lps',{
        params:paginationDto,

    })

    return data;
};

export const getLp = async(lpId: number):Promise<ResponseLpDetailDto>=>{
    const{data} = await axiostInstance.get(`v1/lps/${lpId}`);

    return data;
}

export const createLP = async(lp: CreateLpRequest):Promise<Lp>=>{
    const { data } = await axiostInstance.post("/v1/lps", lp);
    return data;
}

export const patchLp = async(lpId: number) : Promise<PatchLpDetailResponseDto> => {
    const{data} = await axiostInstance.patch(`v1/lps/${lpId}`);
    return data;
}

export const deleteLp = async(lpId: number) : Promise<boolean> =>{
    const {data} = await axiostInstance.delete(`v1/lps/${lpId}`);
    return data;
}