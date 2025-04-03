import { useState, useEffect } from "react";
import { Movie, MovieResponse } from "../types/movie";
import styled from "styled-components";

// -------------------style------------------------

const MovieContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  padding: 20px;
`;

const MovieCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;

  &:hover img {
    filter: blur(4px);
    transition: all 0.3s ease;
  }

  &:hover div {
    opacity: 1;
  }
`;

const MovieOverlay = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  text-align: center;
  padding: 10px;
  font-weight: bold;
  font-size: 1rem;
`;

const MoviePoster = styled.img`
  border-radius: 8px;
`;
// ------------------------------------------------
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
    <MovieContainer>
      {movies.map((movie) => (
        <MovieCard key={movie.id}>
          <MoviePoster
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
          />
          <MovieOverlay>
            <h4>{movie.title}</h4>
            <p>
              {movie.overview.length > 100
                ? movie.overview.slice(0, 100) + "..."
                : movie.overview}
            </p>
          </MovieOverlay>
        </MovieCard>
      ))}
    </MovieContainer>
  );
};

export default MoviesPage;
