import {Movie} from "./types/movie.ts";
import {MovieCard} from "./MovieCard.tsx";
import './index.css';
import {Link} from "react-router-dom";

export const MovieGrid = ({ movies } : { movies: Movie[] }) => {
    return (
        <div className="grid grid-cols-6 gap-4">
            {
                movies.map((movie) =>
                    <Link to={`/movie/${movie.id}`}>
                        <MovieCard movie={movie} />
                    </Link>)
            }
        </div>
    )
};
