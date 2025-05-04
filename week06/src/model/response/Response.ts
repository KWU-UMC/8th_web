export type Response<T> = {
    status: boolean,
    statusCode: number,
    message: string,
    data: T,
    hasNext: boolean,
    nextCursor: number
};
