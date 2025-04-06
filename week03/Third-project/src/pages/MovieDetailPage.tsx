import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { CastMember, MovieDetail } from "../types/movie";

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovieData = async (): Promise<void> => {
      setIsPending(true);
      try {
        // 영화 상세 정보 요청
        const movieResponse = await axios.get<MovieDetail>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        // 영화 크레딧 정보 요청 (출연 배우)
        const creditsResponse = await axios.get<{ cast: CastMember[] }>(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        setMovie(movieResponse.data);
        setCast(creditsResponse.data.cast);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovieData();
  }, [movieId]);

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

          {/* 출연 배우 목록 */}
          <h2 className="text-2xl font-bold mt-6">출연 배우</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {cast.map((actor) => (
              <div key={actor.id} className="text-center">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : "https://via.placeholder.com/200"
                  }
                  alt={actor.name}
                  className="rounded-full mx-auto w-24 h-24 object-cover"
                />
                <p className="text-sm font-semibold">{actor.name}</p>
                <p className="text-xs text-gray-500">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
