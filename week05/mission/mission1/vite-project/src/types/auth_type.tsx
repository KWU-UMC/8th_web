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
