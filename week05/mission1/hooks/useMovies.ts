import { useState, useEffect } from "react";
import { Movie, MovieResponse } from "../src/types/movie";

const API_HEADERS = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxN2MyZTY4NmU3YTQzOWRkYmIxM2NhOGZhOWMxMGIzNyIsIm5iZiI6MTc0MzUyNzQxMC4xMjk5OTk5LCJzdWIiOiI2N2VjMWRmMjE5ZjFiMWNiNGVmYTAzM2YiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.iOwXuemrIIvdoNyS9YeUgoV-RQHqUwnwgcIXpuCPX6M",
  Accept: "application/json",
};

export const useMovies = (endpoint: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${endpoint}&page=${page}`, {
          headers: API_HEADERS,
        });
        const data: MovieResponse = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("영화 데이터를 가져오는 중 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [endpoint, page]);

  return { movies, page, totalPages, setPage, loading };
};
