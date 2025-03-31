import "./index.css";
import {MovieDetail} from "./types/movie_detail.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {getMovieImageUrl, Headers} from "./utils/auth.ts";

const Production = ({ name, logoPath }: { name: string, logoPath: string }) => {
    return (
        <div className="w-32 flex flex-col justify-center">
            <img className="border-white border-4 rounded-full w-32 h-32 object-center object-cover bg-white" src={ getMovieImageUrl('w300', logoPath) } alt="Production logo" />
            <p className="text-sm text-white font-bold text-center mt-2">{name}</p>
        </div>
    )
};

const _MovieDescription = ({ movie }: { movie: MovieDetail }) => {
    return (
        <div className="bg-neutral-900">
            <div className="h-[70vh] w-full relative overflow-hidden">
                <img className="absolute inset-0 w-full h-full object-cover object-center" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={`Poster of ${movie.title}`}/>
                <div className="absolute max-w-4/5 flex flex-col h-full justify-center p-12 bg-gradient-to-r from-neutral-800 to-neutral-800/0 text-white gap-4">
                    <div className="max-w-2/5">
                        <p className="text-3xl font-bold">{movie.title}</p>
                        <p className="text-lg">Rating {movie.vote_average}</p>
                        <p className="text-lg mb-6">{movie.release_date.split('-')[0]}</p>
                        <p className="text-xl font-bold">{movie.tagline}</p>
                        <p className="text-lg">{movie.overview}</p>
                    </div>
                </div>
            </div>

            <div className="mt-8 p-12">
                <p className="text-5xl text-white mb-4">Productions</p>

                <div className="grid gap-4 grid-cols-8">
                    {movie.production_companies.map((production) => <Production key={production.id} name={production.name} logoPath={production.logo_path} />)}
                </div>
            </div>
        </div>
    )
};

export const MovieDescription = ({ movieId }: { movieId: number }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [movie, setMovie] = useState<MovieDetail | null>(null);

    useEffect(() => {
        (async () => {
            try {
                setIsError(false);
                setIsLoading(true);
                const {data} = await axios.get<MovieDetail>(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
                    headers: Headers
                });
                setMovie(data);
            } catch {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [movieId]);

    return (
        <>
            {isError ? <p>에러...</p> : (
                isLoading ? <p>로딩중...</p> : (
                    <_MovieDescription movie={movie!} />
                )
            )}
        </>
    )
};
