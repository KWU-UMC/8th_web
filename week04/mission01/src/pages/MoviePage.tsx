import { useState } from "react";

import { MovieResponse } from "../types/movie";

import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useOutletContext, useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";

export default function MoviePage() {
  const [page, setPage] = useState(1);
  // 페이지 번호 상태 관리 (초기값 1)
  const { language } = useOutletContext<{ language: "ko-KR" | "en-US" }>();
  // 부모 컴포넌트에서 전달받은 언어 상태
  // useOutletContext 훅을 사용하여 부모 컴포넌트에서 전달받은 언어 상태를 가져옴
  // useOutletContext는 Outlet 컴포넌트의 context를 가져오는 훅

  const { category } = useParams<{ category: string }>();

  const url = `https://api.themoviedb.org/3/movie/${category}?page=${page}`; // 카테고리와 페이지 번호를 포함한 URL
  // 카테고리와 페이지 번호를 URL에 포함시켜 API 요청을 보냄

  const {
    data: movies,
    isPending,
    isError,
  } = useCustomFetch<MovieResponse>(url, language); // useCustomFetch 훅을 사용하여 API 요청

  console.log(movies);
  // useCustomFetch 훅을 사용하여 API 요청

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
        {" "}
        {/* 페이지네이션 버튼들 */}
        <button
          disabled={page === 1} // 페이지가 1이면 이전 페이지 버튼 비활성화
          className="bg-[#dda5e3] rounded-lg px-2 py-2 font-bold shadow-md text-white hover:bg-[#b2dab1] transition-all duration-300 disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed"
          onClick={() => setPage((prev) => prev - 1)}
        >{`<`}</button>
        {/* 이전 페이지 버튼 */}
        <span>{page}페이지</span>
        {/* 현재 페이지 표시 */}
        <button
          className="bg-[#dda5e3] rounded-lg px-2 py-2 font-bold shadow-md text-white hover:bg-[#b2dab1] transition-all duration-300 cursor-pointer "
          onClick={() => setPage((prev) => prev + 1)}
        >{`>`}</button>
        {/* 다음 페이지 버튼 */}
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
            movies.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          {/* 영화 카드들 보여줌 */}
        </div>
      )}
      {/* 로딩중이 아닐 때는 영화 카드들 보여줌 */}
    </>
  );
}
