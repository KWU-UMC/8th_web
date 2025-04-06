import { useEffect, useState } from 'react';
// import axios from 'axios';
import { Movie, MovieResponse } from '../types/movie';
import MovieCard from '../components/MovieCard';
import {axiosInstance} from '../apis/axiosInstance';

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
        try {
          const { data }: { data: MovieResponse } = await axiosInstance.get(''); 
          setMovies(data.results);
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      };

    fetchMovies();
  }, []);

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