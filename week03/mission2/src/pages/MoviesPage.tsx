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

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(false);
      try {
        const movieCategory = category || 'popular';    // 홈 페이지 PopularPage로 나오도록 설정
        const URL = `/${movieCategory}?language=en-US&page=1`;
  
        const { data }: { data: MovieResponse } = await axiosInstance.get(URL);
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(true);
      } finally {
        setLoading(false);  // 스피너 확인하려면 true로 바꾸기
      }
    };

    fetchMovies();
  }, [category]);  

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-17 h-17 text-lime-200 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message="에러가 발생했습니다." />;
  }

  return (
    <div className="flex flex-wrap justify-start -m-2">
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
  );
};

export default MoviesPage;