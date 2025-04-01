import { useEffect, useState } from 'react';
// import axios from 'axios';
import { Movie, MovieResponse } from '../types/movie';
import MovieCard from '../components/MovieCard';
import {axiosInstance} from '../apis/axiosInstance';
import { useParams } from 'react-router-dom';
import { Loader2 } from "lucide-react";
import ErrorMessage from '../components/ErrorMessage';

const MoviesPage = () => {
  const { category } = useParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);  
  const [totalPages, setTotalPages] = useState(1); 

  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(false);
      try {
        const movieCategory = category || 'popular';    // 홈 페이지 PopularPage로 나오도록 설정
        const URL = `/${movieCategory}?language=en-US&page=${page}`;

        const { data }: { data: MovieResponse } = await axiosInstance.get(URL);
        setMovies(data.results);
        setTotalPages(data.total_pages); 
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category, page]); 

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-16 h-16 text-lime-200 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message="영화를 불러오는 중 오류가 발생했습니다." />;
  }

  return (
    <div className="flex flex-col items-center overflow-hidden">
      {/* 영화 리스트 */}
      <div className="flex flex-wrap justify-start -m-2 overflow-hidden">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            image={movie.poster_path}
            title={movie.title}
            overview={movie.overview}
          />
        ))}
      </div>

      {/* 페이지네이션 버튼 */}
      <div className="flex justify-center gap-4 mt-8 fixed bottom-20 w-full">
        <button
          className={`px-4 py-2 text-white bg-lime-200 rounded disabled:opacity-50 
            ${page === 1 ? 'cursor-not-allowed' : 'hover:bg-red-400'}`}
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          &lt;
        </button>

        <span className="text-white text-lg flex items-center">
          {page} 페이지
        </span>

        <button
          className={`px-4 py-2 text-white bg-lime-200 rounded disabled:opacity-50 
            ${page === totalPages ? 'cursor-not-allowed' : 'hover:bg-red-400'}`}
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default MoviesPage;