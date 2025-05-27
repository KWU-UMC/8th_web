import { PaginationDto } from "../types/common";
import { ResponseLpDetailDto, ResponseLPListDto } from "../types/lp";
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
