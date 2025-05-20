import {Movie} from "./types/movie.ts";
import './index.css';

export const MovieCard = ({ movie } : { movie: Movie}) => {
    return <div className="max-w-48 relative overflow-hidden rounded-xl group">
        <img className="w-full" src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt="poster" />
        <div className="absolute top-0 invisible group-hover:visible flex flex-col items-center justify-center w-full h-full p-2 backdrop-blur-md">
            <p className="text-base text-center font-bold text-white">{movie.title}</p>
            <p className="line-clamp-3 text-center text-white">{movie.overview}</p>
        </div>
    </div>
};
