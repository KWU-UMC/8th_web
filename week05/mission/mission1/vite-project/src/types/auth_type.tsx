export type CheckAccessTokenValid = {
  status: boolean;
  message: string;
  statusCode: number;
  data: string;
};

export type Login = {
  status: boolean;
  message: string;
  statusCode: number;
  data: {
    id: number;
    name: string;
    accessToken: string;
    refreshToken: string;
  };
};

export type LP = {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: string;
    updatedAt: string;
  };
};
