import {Response} from "./Response.ts";

export type UserResponse = Response<UserData>

export type UserData = {
    id: number,
    name: string,
    email: string,
    bio: string | null,
    avatar: string | null,
    createdAt: string,
    updatedAt: string
}
