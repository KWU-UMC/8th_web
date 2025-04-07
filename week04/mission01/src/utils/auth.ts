export const Headers = {
    Authorization: 'Bearer'
}

export const getMovieImageUrl = (size: string, path: string) => {
    return `https://image.tmdb.org/t/p/${size}${path}`;
}
