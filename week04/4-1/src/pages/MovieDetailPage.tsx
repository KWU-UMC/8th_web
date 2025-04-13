import { LoadingSpinner } from "../components/LoadingSpinner";
import { MovieDetail } from "../types/movie";
import useCustomFetch from "../hooks/useCustomFetch";
import { useParams } from "react-router-dom";

export default function MovieDetailPage() {
  const params = useParams();
  const url = `https://api.themoviedb.org/3/movie/${params.movieId}`;

  const { isPending, isError, data: movie } = useCustomFetch<MovieDetail>(url);

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-10 bg-black text-white">
      MovieDetailPage(params.movieid)
      {movie && (
        <div className="max-w-2xl mx-auto">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg shadow-lg"
          />
          <h1 className="text-3xl font-bold mt-4">{movie.title}</h1>
          <p className="text-gray-500">{movie.release_date}</p>
          <p className="text-lg mt-2">{movie.overview}</p>
          <p className="mt-2 font-semibold"></p>
        </div>
      )}
    </div>
  );
}
