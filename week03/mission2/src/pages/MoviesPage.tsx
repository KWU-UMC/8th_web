import { useEffect, useState } from 'react';
// import axios from 'axios';
import { Movie, MovieResponse } from '../types/movie';
import MovieCard from '../components/MovieCard';
import {axiosInstance} from '../apis/axiosInstance';
import { useParams } from 'react-router-dom';

const MoviesPage = () => {
  const { category } = useParams();  
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieCategory = category || 'popular';  // 홈 페이지 PopularPage로 나오도록 설정
        const URL = `/${movieCategory}?language=en-US&page=1`;
  
        const { data }: { data: MovieResponse } = await axiosInstance.get(URL);
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [category]);  

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