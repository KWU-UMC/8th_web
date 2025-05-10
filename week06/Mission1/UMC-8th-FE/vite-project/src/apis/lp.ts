import { PaginationDto } from "../types/common";
import { ResponseLPListDto } from "../types/lp";
import { axiostInstance } from "./axios";

export const getLPList = async(paginationDto: PaginationDto):Promise<ResponseLPListDto> => {
    const{data} = await axiostInstance.get('v1/lps',{
        params:paginationDto,

    })

    return data;
};