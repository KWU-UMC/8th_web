//import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../types/movie";
import axios  from "axios";


//movies.tsx
const MoviePage = ()=>{
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            //응답에 대한 타입 정의
            const { data } = await axios.get<MovieResponse>(
                `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1`,
                {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTA3OGI0N2M0Yzg0N2ZjYzE0MDE1YzYyMWY4ZTQyNyIsIm5iZiI6MTc0MzY3MzQ2NC42MzYsInN1YiI6IjY3ZWU1ODc4NTRmNTk1YmI1NWE3YTM4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WnNWEAhJwc9K4XrLE-5_WWCfDKTwDfog0p2FxuuoJr8`,
                    },
                }
            );
            
            setMovies(data.results);
        };
        fetchMovies();
    }, []);

    return(
        <ul>
            {/*옵셔널 체인 활용*/}
            {movies?.map((movie => (
                <li key={movie.id}>
                    <h1>{movie.title}</h1>
                </li>
            )))}
        </ul>
    );
};

export default MoviePage;