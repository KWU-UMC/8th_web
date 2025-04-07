import { MovieResponse } from '../types/movie';
import MovieCard from '../components/MovieCard';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Loader2 } from "lucide-react";
import ErrorMessage from '../components/ErrorMessage';
import { useCustomFetch } from '../hooks/useCustomFetch';

const MoviesPage = () => {
  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const page = Number(searchParams.get('page')) || 1;

  const movieCategory = category || 'popular';
  const URL = `/${movieCategory}?language=en-US&page=${page}`;

  const { data, loading, error } = useCustomFetch<MovieResponse>(URL);

  const handlePageChange = (newPage: number) => {
    navigate(`?page=${newPage}`);
  };

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
      <div className="flex justify-center gap-4 mt-8 fixed bottom-20 w-full">
        <button
          className={`px-4 py-2 text-white bg-lime-200 rounded disabled:opacity-50 
            ${page === 1 ? 'cursor-not-allowed' : 'hover:bg-red-400'}`}
          disabled={page === 1}
          onClick={() => handlePageChange(Math.max(page - 1, 1))}
        >
          &lt;
        </button>

        <span className="text-white text-lg flex items-center">
          {page} 페이지
        </span>

        <button
          className={`px-4 py-2 text-white bg-lime-200 rounded disabled:opacity-50 
            ${page === data.total_pages ? 'cursor-not-allowed' : 'hover:bg-red-400'}`}
          disabled={page === data.total_pages}
          onClick={() => handlePageChange(Math.min(page + 1, data.total_pages))}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default MoviesPage;