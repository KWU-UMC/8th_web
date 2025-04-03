import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "./types/movie_type";
import MovieContainer from "./components/movie";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const url =
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
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
    <div className="w-full h-screen flex justify-center items-center">
      <ul className="grid grid-cols-6">
        {movies?.map((movie) => (
          <li key={movie.id}>
            <MovieContainer movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
