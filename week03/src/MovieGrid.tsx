import {Movie} from "./types/movie.ts";
import {MovieCard} from "./MovieCard.tsx";
import './index.css';

export const MovieGrid = ({ movies } : { movies: Movie[] }) => {
    return (
        <div className="grid grid-cols-6 gap-4">
            {
                movies.map((movie) =>
                    <MovieCard movie={movie}/>)
            }
        </div>
    )
};
