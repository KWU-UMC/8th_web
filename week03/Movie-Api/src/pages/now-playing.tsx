import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../types/movie";
import { styled } from "styled-components";

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
  color: #ffffff;
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding-bottom: 20px;

  button {
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    background-color: #444;
    color: #fff;
    cursor: pointer;

    &:disabled {
      background-color: #999;
      cursor: not-allowed;
    }
  }
`;
// ------------------------------------------------

const NowPlaying = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const min_date = "2024-01-01";
  const max_date = "2024-12-31";

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${min_date}&release_date.lte=${max_date}`,
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
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };

    fetchNowPlaying();
  }, [page]);

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      <Pagination>
        <button onClick={handlePrev} disabled={page === 1}>
          ◀ 이전
        </button>
        <span>페이지 {page}</span>
        <button onClick={handleNext} disabled={page === totalPages}>
          다음 ▶
        </button>
      </Pagination>

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
    </>
  );
};

export default NowPlaying;
