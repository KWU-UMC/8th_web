export type RequestSigninDto = {
    email: string;
    password: string;  
}

export type RequestSignupDto = {
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
    password: string;
};

export type ResponseSignupDto = {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export type ResponseSigninDto = {
    id: number;
    name: string;
    accessToken: string;
    refreshToken: string;
};

export type ResponseMyInfoDto = {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export type UpdateUserDto = {
    name: string;
    bio: string;
    avatar: string;
}