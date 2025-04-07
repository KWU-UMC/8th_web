import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../apis/axiosInstance';
import { TMovieDetails, TCredits } from '../types/movieInfo'; 
import { Loader2 } from 'lucide-react';
import ErrorMessage from '../components/ErrorMessage';

const DetailPage = () => {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState<TMovieDetails | null>(null);
    const [credits, setCredits] = useState<TCredits | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            setLoading(true);
            setError(false);
            try {
                const movieDetailsURL = `/${movieId}?language=en-US`; 
                const creditsURL = `/${movieId}/credits?language=en-US`; 
                const movieData = await axiosInstance.get(movieDetailsURL);
                const creditsData = await axiosInstance.get(creditsURL);

                setMovieDetails(movieData.data); 
                setCredits(creditsData.data); 
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (movieId) {
            fetchMovieDetails(); 
        }
    }, [movieId]); 

    if (loading) {
        return (
            <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full">
              <Loader2 className="w-16 h-16 text-lime-200 animate-spin" />
            </div>
          );
    }

    if (error || !movieDetails || !credits) {
        return <ErrorMessage message="영화 정보를 불러오는 중 오류가 발생했습니다." />;
    }

    return (
        <div className="px-2.5">
            <div className="relative w-full h-[470px] mb-5 overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
                    alt={movieDetails.title}
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-black via-transparent to-black p-5 text-white">
                    <h1 className="text-5xl font-bold mt-1">{movieDetails.title}</h1>
                    <p className="mt-4 text-lg">평균 {movieDetails.vote_average}</p>
                    <p className="text-lg">{new Date(movieDetails.release_date).getFullYear()}</p>
                    <p className="text-lg">{movieDetails.runtime}분</p>
                    {movieDetails.tagline && <h2 className="italic text-3xl text-lightGray my-5">{movieDetails.tagline}</h2>}
                    <p className="mt-2 w-1/2 text-lg">{movieDetails.overview}</p>
                </div>
            </div>

            <div className="mt-5">
                <h3 className="text-3xl font-bold text-white mb-4 px-4">감독/출연</h3>
                <ul className="list-none p-0 flex flex-wrap">
                    {credits?.cast && credits.cast.length > 0 ? (
                        credits.cast.slice(0, 20).map((castMember) => (
                            <li key={castMember.id} className="mb-5 w-1/10 text-center flex flex-col items-center">
                                <img
                                    className="w-[100px] h-[100px] rounded-full object-cover mb-2"
                                    src={`https://image.tmdb.org/t/p/w500/${castMember.profile_path}`}
                                    alt={castMember.name}
                                />
                                <div className="text-white font-bold">{castMember.name}</div>
                                <div className="text-gray-500 text-sm">{castMember.character}</div>
                            </li>
                        ))
                    ) : (
                        <div className="flex justify-center items-center w-full h-[200px]">
                            <h4 className="text-white text-2xl">출연진 정보 없음</h4>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default DetailPage;