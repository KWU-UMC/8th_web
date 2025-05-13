import { useMovies } from "../../hooks/useMovies";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: #ffffff;
  display: flex;
  flex-direction: column;
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

// -------------------컴포넌트------------------------

const TopRated = () => {
  const navigate = useNavigate();

  const endpoint =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200";

  const { movies, page, totalPages, setPage, loading } = useMovies(endpoint);

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

      {loading ? (
        <p style={{ textAlign: "center", color: "#999" }}>로딩 중...</p>
      ) : (
        <MovieContainer>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
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
      )}
    </>
  );
};

export default TopRated;
