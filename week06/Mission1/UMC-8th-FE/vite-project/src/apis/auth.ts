import { RequestSigninDto, RequestSignupDto, ResponseMyInfoDto, ResponseSigninDto, ResponseSignupDto } from "../types/auth";
import { axiostInstance } from "./axios";

export const postSignup = async(body: RequestSignupDto):Promise<ResponseSignupDto>=> {
    const { data } = await axiostInstance.post("/v1/auth/signup", body);

    return data;
};

export const postSignin = async(body: RequestSigninDto) :Promise<ResponseSigninDto>=> {
    const { data } = await axiostInstance.post("/v1/auth/signin", body);

    return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
    const { data } = await axiostInstance.get("/v1/users/me");

    return data;
};

export const postLogout = async() => {
    const {data} = await axiostInstance.post("/v1/auth/signout");

    return data;
};
