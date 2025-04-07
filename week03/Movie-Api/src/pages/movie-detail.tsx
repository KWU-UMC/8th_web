import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Movie } from "../types/movie";
import { Cast, CreditResponse } from "../types/cast";

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [credits, setCredits] = useState<Cast[]>([]);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxN2MyZTY4NmU3YTQzOWRkYmIxM2NhOGZhOWMxMGIzNyIsIm5iZiI6MTc0MzUyNzQxMC4xMjk5OTk5LCJzdWIiOiI2N2VjMWRmMjE5ZjFiMWNiNGVmYTAzM2YiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.iOwXuemrIIvdoNyS9YeUgoV-RQHqUwnwgcIXpuCPX6M",
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("영화 상세 정보 불러오기 실패:", error);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxN2MyZTY4NmU3YTQzOWRkYmIxM2NhOGZhOWMxMGIzNyIsIm5iZiI6MTc0MzUyNzQxMC4xMjk5OTk5LCJzdWIiOiI2N2VjMWRmMjE5ZjFiMWNiNGVmYTAzM2YiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.iOwXuemrIIvdoNyS9YeUgoV-RQHqUwnwgcIXpuCPX6M",
              Accept: "application/json",
            },
          }
        );
        const data = await res.json();
        setCredits(data.cast);
        console.log(data);
      } catch (err) {
        console.error("Cast 가져오기 실패:", err);
      }
    };

    fetchCredits();
  }, [movieId]);

  if (!movie) return <p>로딩 중...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <p>평점: {movie.vote_average}</p>
      <p>개봉일: {movie.release_date}</p>
      <p>출연진:</p>
      <div>
        {credits.map((member) => (
          <div key={member.cast_id}>
            {member.name} ({member.character})
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;
