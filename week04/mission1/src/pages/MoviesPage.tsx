import { MovieResponse } from '../types/movie';
import MovieCard from '../components/MovieCard';
import { useParams } from 'react-router-dom';
import { Loader2 } from "lucide-react";
import ErrorMessage from '../components/ErrorMessage';
import { useCustomFetch } from '../hooks/useCustomFetch';
import { usePagination } from '../hooks/usePagination';
import Pagination from '../components/Pagination';

const MoviesPage = () => {
  const { category } = useParams();
  const { page, handlePageChange } = usePagination();

  const movieCategory = category || 'popular';
  const URL = `/${movieCategory}?language=en-US&page=${page}`;
  const { data, loading, error } = useCustomFetch<MovieResponse>(URL);

  if (loading) {
    return (
      <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full">
        <Loader2 className="w-16 h-16 text-lime-200 animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return <ErrorMessage message="영화를 불러오는 중 오류가 발생했습니다." />;
  }

  return (
    <div className="flex flex-col items-center overflow-hidden">
      {/* 영화 리스트 */}
      <div className="flex flex-wrap justify-start -m-2 overflow-hidden">
        {data.results.map((movie) => (
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
      <Pagination
        currentPage={page}
        totalPages={data.total_pages}
        onPageChange={handlePageChange} 
      />
    </div>
  );
};

export default MoviesPage;