// 리액트 훅들 불러옴 - useEffect: 컴포넌트 처음 렌더될 때 딱 한 번 실행(dependency array []), useState: 상태 저장용
import { useEffect, useState } from "react";

// axios로 API 요청 보낼거니까 import
import axios from "axios";

// 타입스크립트용 타입들 (Movie 타입: 영화 하나의 구조, MovieResponse: 전체 응답 구조)
import { Movie, MovieResponse } from "../types/movie";

// 컴포넌트로 분리한 MovieCard 불러옴. 각 영화 카드 하나하나 보여주는 역할
import MovieCard from "../components/MovieCard";

export default function MoviePage() {
  // movies라는 상태 만들어둠. 여기에 API에서 받아온 영화 데이터들이 배열 형태로 들어감
  const [movies, setMovies] = useState<Movie[]>([]);

  // 이 컴포넌트가 처음 화면에 나타났을 때 딱 한 번 실행됨
  useEffect(() => {
    // async/await로 비동기 API 요청 처리함
    const fetchMovies = async () => {
      // axios.get<MovieResponse> → 응답 형태가 MovieResponse라는 걸 타입으로 지정해줌
      const { data } = await axios.get<MovieResponse>(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`, // 환경변수에서 API 키 가져오기
          },
        }
      );

      // 받아온 데이터 중 영화 리스트 (data.results)를 상태로 저장
      setMovies(data.results);
    };

    // 실제 함수 실행
    fetchMovies();
  }, []); // 의존성 배열이 비어있으면 마운트 시 1회 실행됨

  return (
    // tailwind를 활용해서 반응형 그리드로 영화 카드 정렬
    <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {/* movies가 존재하면 map으로 돌면서 각 영화마다 MovieCard 컴포넌트 렌더링 */}
      {movies &&
        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  );
}
