import axios from "axios";
import { useEffect,useState } from "react";
import { Movie, MovieResponse} from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PageButton } from "../components/PageButton";
import { useParams } from "react-router-dom";

export default function MoviePage(){
    const [movies, setMovies] = useState<Movie[]>([]);
    
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);
    const [page, setPage] = useState(1);

    //구조 분해 할당
    const {category} = useParams<{
        category: string;
    }>();

    useEffect((): void => {
    const fetchMovies = async () : Promise<void>=>{
        setIsPending(true);

        try{
            const{ data } = await axios.get<MovieResponse>(
                `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
                {
                    headers : {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    },
                }
            );

            setMovies(data.results);        
        } catch {
            setIsError(true);
        }finally{
            setIsPending(false);
        }
    };
    
    fetchMovies();  
    }, [page, category]);

    if(isError){
        return (
        <div>
            <span className="text-red-500 text-2xl flex items-center justify-center h-dvh"> 
                ⚠️에러가 발생했습니다⚠️
            </span>
        </div>
        )
    }

    return(
        //반응형        
        <>  
            <PageButton page={page} setPage={setPage}/>

            {isPending && (
                <div className="flex items-center justify-center h-dvh"> 
                    <LoadingSpinner/>
                </div>
            )}

            {!isPending && (
                <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
                lg:grid-cols-5 xl:grid-cols-6'>
                    {movies?.map( movie => (
                        <MovieCard key={movie.id} moive={movie}/>
                    ))}
                </div>
            )}
        </>
    );
}  