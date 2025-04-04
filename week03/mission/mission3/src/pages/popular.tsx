import { useEffect, useState } from "react";
import { MovieResponse } from "../types/movie_type";
import MovieContainer from "../components/movie";
import Loadindicator from "../components/loadindicator";
import Pagebutton from "../components/pagebutton";
import { useNavigate } from "react-router-dom";

export default function Popular() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<MovieResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [pageTrigger, setPageTrigger] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API}`,
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          navigate("/error");
          throw new Error(`API request error: ${response.status}`);
        }
        const data: MovieResponse = await response.json();
        setMovies(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [pageTrigger]);

  if (isLoading) return <Loadindicator />;

  return (
    <div className="w-full h-screen px-30 my-20 box-border">
      <Pagebutton
        currentPage={movies?.page as number}
        totalPage={movies?.total_pages as number}
        setPageTrigger={setPageTrigger}
        setPage={setPage}
      />
      <ul className="grid grid-cols-6 gap-[20px] max-[1000px]:grid-cols-5 max-[850px]:grid-cols-4 max-[730px]:grid-cols-3 max-[600px]:grid-cols-2 max-[480px]:grid-cols-1">
        {movies?.results.map((movie) => (
          <li className="min-w-[120px]" key={movie.id}>
            <MovieContainer movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
}
