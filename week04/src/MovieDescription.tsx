import "./index.css";
import {MovieDetail} from "./types/movie_detail.ts";
import {getMovieImageUrl} from "./utils/auth.ts";
import {Cast, CreditsResponse, Crew} from "./types/credits.ts";
import {useTmdbFetch} from "./hooks/useTmdbFetch.ts";

const Production = ({ name, logoPath }: { name: string, logoPath: string }) => {
    return (
        <div className="w-32 flex flex-col justify-center">
            <img className="border-white border-4 rounded-full w-32 h-32 object-center object-cover bg-white" src={ getMovieImageUrl('w300', logoPath) } alt="Profile" />
            <p className="text-sm text-white font-bold text-center mt-2">{name}</p>
        </div>
    )
};

const _MovieDescription = ({ movie, casts, crews }: {
    movie: MovieDetail,
    casts: Cast[],
    crews: Crew[]
}) => {
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
                <p className="text-5xl text-white mb-4">Staffs</p>

                <div className="grid gap-4 grid-cols-8">
                    {casts.map((production) => <Production key={production.id} name={production.name} logoPath={production.profile_path} />)}
                    {crews.map((production) => <Production key={production.id} name={production.name} logoPath={production.profile_path} />)}
                </div>
            </div>
        </div>
    )
};

export const MovieDescription = ({ movieId }: { movieId: number }) => {
    const { data: movie, isLoading: isLoadingMovie, isError: isErrorMovie } = useTmdbFetch<MovieDetail>(`/movie/${movieId}?language=en-US`);
    const { data: credits, isLoading: isLoadingCredits, isError: isErrorCredits } = useTmdbFetch<CreditsResponse>(`/movie/${movieId}/credits`);

    const isError = isErrorMovie || isErrorCredits;
    const isLoading = isLoadingCredits || isLoadingMovie;

    return (
        <>
            {isError ? <p>에러...</p> : (
                isLoading ? <p>로딩중...</p> : (
                    <_MovieDescription movie={movie!} casts={credits!.cast} crews={credits!.crew} />
                )
            )}
        </>
    )
};
