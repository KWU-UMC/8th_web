import { useParams } from "react-router-dom";
import { CreditResponse, MovieDetail } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";
import useCustomFetch from "../hooks/useCustomFetch";

export default function MovieDetailPage (){
    const { movieId } = useParams<{ movieId : string }>();
    // const [movie, setMovie] = useState<MovieDetail | null>(null);
    // const [credits,  setCredits] = useState<CreditResponse |null> (null);
    // const [isLoading, setIsLoading] = useState(false);
    // const [isError, setIsError] = useState(false);
    const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}`;
    const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;

    const {data: movie, isPending: isMovieLoading, isError: isMovieError} = useCustomFetch<MovieDetail>(movieUrl,'ko-KR');

    const {data: credits, isPending: isCreditsLoading, isError: isCreditsError} = useCustomFetch<CreditResponse>(creditsUrl,'ko-KR');

    const isLoading = isCreditsLoading || isMovieLoading;
    const isError = isMovieError || isCreditsError;

    if(isError){
        return(
            <div>
                <span className="text-red-500 text-2xl flex items-center justify-center h-dvh"> 
                ⚠️에러가 발생했습니다⚠️
                </span>
            </div>
        )
    }
    return(
        <>
        {isLoading && (
            <div className="flex justify-center items-center h-dvh">
                <LoadingSpinner />
            </div>
        )}

        {!isLoading && movie && credits && (
            <div className="bg-black text-white min-h-screen">
                <div
                className="bg-cover bg-center h-[400px] flex items-end p-10"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}>
                    <div className="bg-gradient-to-t from-black/80 to-transparent p-6 rounded w-full">
                    <h1 className="text-4xl font-bold">{movie.title}</h1>
                    <p className="text-lg text-gray-300 mt-2">평균 {movie.vote_average}</p>
                    <p className="text-gray-400">
                        {movie.release_date.slice(0, 4)} · {movie.runtime}분
                    </p>
                    <p className="text-xl font-medium mt-4">{movie.tagline}</p>
                    <p className="mt-3 text-sm leading-relaxed text-gray-300">{movie.overview}</p>
                    </div>
                </div>

                <div className="p-10">
                    <h2 className="text-2xl font-semibold mb-4">감독/출연</h2>
                    <div className="flex flex-wrap gap-6 justify-start">
                    {[credits.crew.find((p) => p.job === "Director"), ...credits.cast.slice(0, 15)].map(
                    (person, index) =>  person && (
                        <div key={`${person.id}-${index}`} className="w-24 text-center">
                        <img
                            src={person.profile_path
                            ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                            : "https://via.placeholder.com/185x278?text=No+Image"}
                            alt={person.name}
                            className="w-24 h-24 rounded-full object-cover mx-auto mb-2"
                        />
                        <p className="text-sm font-medium">{person.name}</p>
                            {"character" in person && (
                        <p className="text-xs text-gray-400">{person.character}</p>
                        )}
                        {"job" in person && person.job === "Director" && (
                        <p className="text-xs text-gray-400">(감독)</p>)}
                        </div>
                    )
                )}
            </div>
        </div>
    </div>
    )}
</>
);
}