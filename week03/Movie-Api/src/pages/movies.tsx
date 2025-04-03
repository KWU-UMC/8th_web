import { useState, useEffect } from "react";
import { Movie, MovieResponse } from "../types/movie";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxN2MyZTY4NmU3YTQzOWRkYmIxM2NhOGZhOWMxMGIzNyIsIm5iZiI6MTc0MzUyNzQxMC4xMjk5OTk5LCJzdWIiOiI2N2VjMWRmMjE5ZjFiMWNiNGVmYTAzM2YiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.iOwXuemrIIvdoNyS9YeUgoV-RQHqUwnwgcIXpuCPX6M",
              Accept: "application/json",
            },
          }
        );
        const data: MovieResponse = await response.json();
        setMovies(data.results);
        console.log(data.results);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>영화 데이터 불러오자</h1>
      <div>
        {movies.map((movie) => (
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            style={{ width: "100%", borderRadius: "8px" }}
          />
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
