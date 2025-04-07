import { useParams } from "react-router-dom";
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Movie, Credit } from "../types/movie";
import useCustomFetch from "../hooks/useCustomFetch";

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const url_movie = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`
  const url_credits = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-U`
  
  const {data: movie, isPending: isMoviePending, isError: isMovieError} = useCustomFetch<Movie>(url_movie);
  const {data: credits, isPending: isCreditsPending, isError: isCreditsError} = useCustomFetch<Credit>(url_credits);

  if (isMovieError || isCreditsError) {
    return (
      <div>
        <span className="text-red-500 text-2x;">에러가 발생했습니다.</span>
      </div>
    )
  }

  if (isMoviePending || isCreditsPending) {
    return (
      <div className="flex item-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-10">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4 p-5">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            alt={movie?.title}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-2/3 p-5">
          <h2 className="text-3xl font-bold mb-2">{movie?.title}</h2>
          <p className="text-lg text-gray-500 font-bold mb-2">
            개봉일: {movie?.release_date} | 평점: {movie?.vote_average.toFixed(1)} / 10.0
          </p>
          <p className="text-sm text-gray-700">{movie?.overview}</p>

          {/* 감독 */}
          {credits?.crew && credits.crew.filter((member) => member.job === "Director").length > 0 && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">감독</h3>
              <ul>
                {credits.crew
                  .filter((member) => member.job === "Director")
                  .map((director) => (
                    <li key={director.id} className="text-lg text-gray-800">
                      {director.name}
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {/* 출연자 */}
          {credits?.cast && credits.cast.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mt-4 mb-2">출연자</h3>
              <ul>
                {credits.cast.slice(0, 5).map((actor) => (
                  <li key={actor.id} className="text-gray-800">
                    <span className="text-lg">{actor.name}</span>{" "}
                    <span className="text-sm text-gray-600">(as {actor.character})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
