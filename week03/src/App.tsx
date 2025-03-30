import './index.css';
import {createBrowserRouter, Link, Outlet, RouterProvider} from "react-router-dom";
import {Movie, MovieResponse} from "./types/movie.ts";
import {useEffect, useState} from "react";
import {MovieGrid} from "./MovieGrid.tsx";
import axios from 'axios';

const RootLayout = () => {
    return (
        <div>
            <nav className="flex gap-4">
                <h1 className="text-3xl font-bold">Movie</h1>
                <div className="flex gap-4 items-center">
                    <Link to="/">Home</Link>
                    <Link to="/popular">Popular</Link>
                    <Link to="/now_playing">Now playing</Link>
                    <Link to="/top_rated">Top rated</Link>
                    <Link to="/upcoming">Upcoming</Link>
                </div>
            </nav>

            <Outlet />
        </div>
    )
}

const TmdbMovieGrid = ({type}: {type: string}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        (async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const {data} = await axios.get<MovieResponse>(`https://api.themoviedb.org/3/movie/${type}?language=en-US&page=${page}`, {
                    headers: {
                        'Authorization': `Bearer`,
                    }
                });

                setMovies(data.results);
            } catch {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [type, page]);

    return (
        <div className="flex flex-col gap-4 items-center">
            <div className="flex flex-row gap-4 items-center">
                <button className="disabled:cursor-not-allowed" disabled={page <= 1} onClick={() => { setPage(page - 1) }}>이전</button>
                <p>{page}</p>
                <button onClick={() => { setPage(page + 1) }}>다음</button>
            </div>

            {
                isError ? <p>에러</p> : (
                    isLoading ? <p>로딩 중...</p> : <MovieGrid movies={movies} />
                )
            }
        </div>
    )
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <p>Home</p>
            },
            {
                path: 'popular',
                element: <TmdbMovieGrid key="popular" type="popular" />
            },
            {
                path: 'now_playing',
                element: <TmdbMovieGrid key="now_playing" type="now_playing" />
            },
            {
                path: 'top_rated',
                element: <TmdbMovieGrid key="top_rated" type="top_rated" />
            },
            {
                path: 'upcoming',
                element: <TmdbMovieGrid key="upcoming" type="upcoming" />
            }
        ]
    }
])

const App = () => {
    return <RouterProvider router={router} />
}

export default App
