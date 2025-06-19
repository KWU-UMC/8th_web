import { useEffect } from "react";
import useCustomFetch from "../hooks/useCustomFetch";
import { Movie, Credit } from "../types/movie";
import { LoadingSpinner } from "./LoadingSpinner";

interface Props {
  movieId: number;
  onClose: () => void;
  language: string;
}

export default function MovieDetailModal({ movieId, onClose, language }: Props) {
  const url_movie = `https://api.themoviedb.org/3/movie/${movieId}?language=${language}`;
  const url_credits = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=${language}`;

  const { data: movie, isPending: moviePending } = useCustomFetch<Movie>(url_movie);
  const { data: credits, isPending: creditsPending } = useCustomFetch<Credit>(url_credits);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  if (moviePending || creditsPending) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl w-full relative">
        <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-700 hover:text-black text-xl"
        >
        ✖
        </button>

        <div className="flex flex-col md:flex-row gap-6">
        <img
            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            alt={movie?.title}
            className="max-h-[80vh] w-auto h-auto object-contain rounded shadow"
        />
        <div className="overflow-auto max-h-[80vh] pr-2">
            <h2 className="text-2xl font-bold mb-2">{movie?.title}</h2>
            <p className="text-gray-600 mb-2">
            개봉일: {movie?.release_date} | 평점: {movie?.vote_average.toFixed(1)} / 10
            </p>
            <p className="text-sm text-gray-800">{movie?.overview}</p>

            {credits?.crew?.some(c => c.job === "Director") && (
            <div className="mt-4">
                <h3 className="font-semibold">감독</h3>
                <ul>
                {credits.crew
                    .filter(c => c.job === "Director")
                    .map(d => (
                    <li key={d.id}>{d.name}</li>
                    ))}
                </ul>
            </div>
            )}

            {credits?.cast?.length > 0 && (
            <div className="mt-4">
                <h3 className="font-semibold">출연진</h3>
                <ul>
                {credits.cast.slice(0, 5).map(actor => (
                    <li key={actor.id}>
                    {actor.name} <span className="text-gray-500 text-sm">(as {actor.character})</span>
                    </li>
                ))}
                </ul>
            </div>
            )}
        </div>
        </div>
    </div>
    </div>
  );
}
