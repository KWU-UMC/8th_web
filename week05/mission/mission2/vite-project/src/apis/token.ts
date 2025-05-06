let refreshToken = "";

export const getRefreshToken = () => refreshToken;
export const setNewRefreshToken = (token: string) => {
  refreshToken = token;
};
