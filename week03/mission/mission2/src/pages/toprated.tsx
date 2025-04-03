import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../types/movie_type";
import MovieContainer from "../components/movie";

export default function Toprated() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const url =
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API}`,
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`API request error: ${response.status}`);
        }
        const data: MovieResponse = await response.json();
        setMovies(data.results);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  if (isLoading) return null;

  return (
    <div className="w-full h-screen px-30 my-20 box-border">
      <ul className="grid grid-cols-6 gap-[20px] max-[1000px]:grid-cols-5 max-[850px]:grid-cols-4 max-[730px]:grid-cols-3 max-[600px]:grid-cols-2 max-[480px]:grid-cols-1">
        {movies?.map((movie) => (
          <li className="min-w-[120px]" key={movie.id}>
            <MovieContainer movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
}
