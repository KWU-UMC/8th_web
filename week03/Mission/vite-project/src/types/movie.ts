export type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};
  
export type MovieResponse = {
    page: number;
    results: Movie[]; // 실제로 들어오는거는 여러개의 영화 데이터니 Movie의 배열로 표현
    total_pages: number;
    total_results: number;
};

//detail 을 위함
export interface MovieDetail {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
    runtime: number;
    tagline: string;
}

export interface CreditResponse {
    cast: {
        id: number;
        name: string;
        profile_path: string | null;
        character: string;
    }[];
    crew: {
        id: number;
        name: string;
        job: string;
        profile_path: string | null;
    }[];
}