import { useEffect, useState } from "react";

import axios from "axios";

import { Movie, MovieResponse } from "../types/movie";

import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";

export default function MoviePage() {
  // movies라는 상태 만들어둠. 여기에 API에서 받아온 영화 데이터들이 배열 형태로 들어감
  const [movies, setMovies] = useState<Movie[]>([]);
  // 1. 로딩 상태 관리용
  const [isPending, setIsPending] = useState(false);
  // 2. 에러 상태 관리용
  const [isError, setIsError] = useState(false);
  // 3. 페이지 관리용
  const [page, setPage] = useState(1);

  const { category } = useParams<{ category: string }>();
  console.log(category);

  // 이 컴포넌트가 처음 화면에 나타났을 때 딱 한 번 실행됨
  useEffect(() => {
    const fetchMovies = async () => {
      setIsPending(true); // API 요청 시작할 때 로딩 상태 true로 변경 (데이터를 호출하는 중이니까)
      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovies(data.results); //데이터를 성공적으로 호출하고 나면 movies 상태에 저장
      } catch {
        setIsError(true); // 에러가 발생하면 에러 상태 true로 변경
      } finally {
        setIsPending(false); // 성공하든 실패하든 API 요청이 끝나면 로딩 상태 false로 변경 (공통 처리)
      }
    };

    fetchMovies();
  }, [page, category]); // page가 바뀔 때마다 API 요청을 다시 함

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">Error!</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center gap-6 mt-6">
        <button
          disabled={page === 1} // 페이지가 1이면 이전 페이지 버튼 비활성화
          className="bg-[#dda5e3] rounded-lg px-2 py-2 font-bold shadow-md text-white hover:bg-[#b2dab1] transition-all duration-300 disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed"
          onClick={() => setPage((prev) => prev - 1)}
        >{`<`}</button>
        <span>{page}페이지</span>

        <button
          className="bg-[#dda5e3] rounded-lg px-2 py-2 font-bold shadow-md text-white hover:bg-[#b2dab1] transition-all duration-300 cursor-pointer "
          onClick={() => setPage((prev) => prev + 1)}
        >{`>`}</button>
      </div>
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}
      {/* 로딩 중일 때는 LoadingSpinner 컴포넌트 보여줌 */}
      {!isPending && (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies &&
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      )}
      {/* 로딩중이 아닐 때는 영화 카드들 보여줌 */}
    </>
  );
}
