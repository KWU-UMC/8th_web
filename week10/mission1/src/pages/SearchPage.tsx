import { useCallback, useMemo, useState } from 'react';
import useCustomFetch from '../hooks/useCustomFetch';
import MovieCard from '../components/MovieCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { MovieResponse } from '../types/movie';
import MovieDetailModal from '../components/MovieDetailModal';
import React from 'react';

const MemoizedMovieCard = React.memo(MovieCard);

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('ko-KR');
  const [includeAdult, setIncludeAdult] = useState(false);
  const [url, setUrl] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: movies, isPending, isError } = useCustomFetch<MovieResponse>(url);

  const handleSearch = () => {
    if (!query.trim()) return;
    const encodedQuery = encodeURIComponent(query.trim());

    const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${encodedQuery}&include_adult=${includeAdult}&language=${language}&page=1`;
    setUrl(apiUrl);
  };

  const handleCardClick = useCallback((movieId: number) => {
    setSelectedMovieId(movieId);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedMovieId(null);
    setIsModalOpen(false);
  }, []);

  const movieList = useMemo(() => {
    return movies?.results?.map((movie) => (
      <MemoizedMovieCard
        key={movie.id}
        movie={movie}
        onClick={() => handleCardClick(movie.id)}
      />
    ));
  }, [movies?.results, handleCardClick]);

  return (
    <div className="p-6">
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto space-y-4">
        <h2 className="text-xl font-semibold">영화 검색</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="영화 제목을 입력하세요"
          className="w-full border px-4 py-2 rounded"
        />

        <div className="flex items-center gap-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border px-3 py-1 rounded"
          >
            <option value="ko-KR">한국어</option>
            <option value="en-US">영어</option>
            <option value="ja-JP">일본어</option>
            <option value="zh-CN">중국어</option>
          </select>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeAdult}
              onChange={(e) => setIncludeAdult(e.target.checked)}
            />
            성인 콘텐츠 표시
          </label>
        </div>

        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
        >
          검색하기
        </button>
      </div>

      {isError && (
        <p className="text-center text-red-500 text-lg font-semibold">
          에러가 발생했습니다.
        </p>
      )}

      {isPending && (
        <div className="flex justify-center items-center h-40">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && movies?.results?.length === 0 && (
        <p className="text-center text-gray-500 text-lg">검색 결과가 없습니다.</p>
      )}

      {!isPending && movies?.results?.length > 0 && (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movieList}
        </div>
      )}

      {isModalOpen && selectedMovieId != null && (
        <MovieDetailModal
          movieId={selectedMovieId}
          onClose={handleModalClose}
          language={language}
        />
      )}
    </div>
  );
}
