export type TUserValues = {
    email: string;
    password: string;
    confirmPassword?: string;
};  

export type TUserData = {
    id: string;
    name: string;
    email: string;
    bio: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
  };
  
export type TUserInfo = {
    status: boolean;
    statusCode: number;
    message: string;
    data?: TUserData | null;
};