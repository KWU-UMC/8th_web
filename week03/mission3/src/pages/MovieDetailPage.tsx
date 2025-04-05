// src/pages/MovieDetailPage.tsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Movie, Credit } from "../types/movie";
import axios from 'axios';

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>(); // URL 파라미터로 movieId 받아옴
  const [movie, setMovie] = useState<Movie | null>(null);
  const [credits, setCredits] = useState<Credit | null>(null); // 감독/출연자 정보
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  // TMDB API에서 영화 정보 및 크레딧 정보 가져오기
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsPending(true);
      setIsError(false);

      try {
        const { data : movieData } = await axios.get<Movie> (
            `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
            {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
            }
        );
        setMovie(movieData);

        const { data: creditsData } = await axios.get<Credit> (
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-U`,
            {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
            }
        );
        setCredits(creditsData);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
    <>
      {isPending && (
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && movie && credits && (
        <div className="container mx-auto p-4">
          {/* 영화 상세 정보 */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
              <p className="text-lg text-gray-500 mb-2">
                {movie.release_date} | 평점: {movie.vote_average}
              </p>
              <p className="text-sm text-gray-700">{movie.overview}</p>

              {/* 감독 */}
              {credits.crew && credits.crew.filter((member) => member.job === "Director").length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">감독</h3>
                  <ul>
                    {credits.crew
                      .filter((member) => member.job === "Director")
                      .map((director) => (
                        <li key={director.id} className="text-gray-800">
                          {director.name}
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              {/* 출연자 */}
              {credits.cast && credits.cast.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mt-4 mb-2">출연자</h3>
                  <ul>
                    {credits.cast.slice(0, 5).map((actor) => (
                      <li key={actor.id} className="text-gray-800">
                        {actor.name} as {actor.character}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetailPage;
