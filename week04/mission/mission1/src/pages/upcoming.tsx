import { useState } from "react";
import MovieContainer from "../components/movie";
import Loadindicator from "../components/loadindicator";
import Pagebutton from "../components/pagebutton";
import { useMovie } from "../hooks/useFetch";

export default function Upcoming() {
  const [page, setPage] = useState<number>(1);

  const { movies, isLoading, setPageTrigger } = useMovie({
    type: "upcoming",
    page,
  });

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
