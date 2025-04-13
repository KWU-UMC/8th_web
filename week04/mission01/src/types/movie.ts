// API 응답의 각 영화 정보 타입 정의
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

// 전체 응답 형태
export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

// 영화 상세 정보 API 응답의 장르 타입 정의
type Genre = {
  id: number;
  name: string;
};
// 영화 상세 정보 API 응답의 제작사 타입 정의
type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};
// 영화 상세 정보 API 응답의 제작국가 타입 정의
type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};
// 영화 상세 정보 API 응답의 언어 타입 정의
type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};
// 영화 상세 정보 API 응답의 전체 타입 정의
export type MovieDetailResponse = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
