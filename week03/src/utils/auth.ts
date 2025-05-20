export const Headers = {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGY5OTk3NmE2Mzg4YTk2YzMyNjhkN2Y4ZDY0YmI3MCIsIm5iZiI6MTc0MzM1MjE0OC43NjYsInN1YiI6IjY3ZTk3MTU0YjU5OTdhMDI2MWU1MzhlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tcEv9QPOqwLzP6EsFDUVEHZ2IRUOCGjYRRvDk-XS23M'
}

export const getMovieImageUrl = (size: string, path: string) => {
    return `https://image.tmdb.org/t/p/${size}${path}`;
}
