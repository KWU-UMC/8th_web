import { useOutletContext, useParams } from "react-router-dom";

import LoadingSpinner from "../components/LoadingSpinner";
import useCustomFetch from "../hooks/useCustomFetch";
import { MovieDetailResponse } from "../types/movie";

export default function MovieDetailPage() {
  const { language } = useOutletContext<{ language: "ko-KR" | "en-US" }>();
  // 부모 컴포넌트에서 전달받은 언어 상태
  // useOutletContext 훅을 사용하여 부모 컴포넌트에서 전달받은 언어 상태를 가져옴
  // useOutletContext는 Outlet 컴포넌트의 context를 가져오는 훅

  const { movieId } = useParams<{ movieId: string }>(); // URL의 movieId 파라미터를 가져오기
  const url = `https://api.themoviedb.org/3/movie/${movieId}`;

  const {
    isPending,
    isError,
    data: movie,
  } = useCustomFetch<MovieDetailResponse>(url, language); // useCustomFetch 훅을 사용하여 API 요청

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">Error!</span>
      </div>
    );
  }

  if (isPending || !movie) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  console.log(movie.genres);
  // movie는 MovieDetailResponse 타입으로, 영화의 상세 정보를 담고 있음

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>
      <p>{movie.overview}</p>
      {/* 추가 정보 출력 */}
    </div>
  );
}
