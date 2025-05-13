import { CommonResponse, CursorBasedResponse } from "./common";
export type Tag = {
    id: number;
    name: string;
};

export type Likes = {
    id: number;
    userId: number;
    lpId: number;
};

// export type ResponseLPListDto = CursorBasedResponse<{
//     data:{
//         id:number;
//         title: string;
//         content: string;
//         thumbnail: string;
//         published: boolean;
//         authorId: number;
//         createdAt: Date;
//         updatedAt: Date;
//         tags: Tag[];
//         likes: Likes[];
//     }[];
// }>

export type Lp = {
        id:number;
        title: string;
        content: string;
        thumbnail: string;
        published: boolean;
        authorId: number;
        createdAt: Date;
        updatedAt: Date;
        tags: Tag[];
        likes: Likes[];
}

export type ResponseLPListDto = CursorBasedResponse<Lp[]>

export type author = {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
}

export type LpDetail = {
    id:number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    tags: Tag[];
    likes: Likes[];
    author: author;
}

export type ResponseLpDetailDto = CommonResponse<LpDetail>;