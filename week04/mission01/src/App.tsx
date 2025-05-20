import './index.css';
import {createBrowserRouter, Link, Outlet, RouterProvider, useLocation, useParams} from "react-router-dom";
import {MovieResponse} from "./types/movie.ts";
import {useState} from "react";
import {MovieGrid} from "./MovieGrid.tsx";
import {MovieDescription} from "./MovieDescription.tsx";
import {useTmdbFetch} from "./hooks/useTmdbFetch.ts";

const RootLayout = () => {
    const location = useLocation();

    const paths = {
        '/': 'Home',
        '/popular': 'Popular',
        '/now_playing': 'Now playing',
        '/top_rated': 'Top rated',
        '/upcoming': 'Upcoming'
    }

    return (
        <div>
            <nav className="flex gap-4">
                <h1 className="text-3xl font-bold">Movie</h1>
                <div className="flex gap-4 items-center">
                    {
                        Object.entries(paths).map(([path, name]) => (
                            <Link className={location.pathname == path ? 'text-green-500' : 'text-neutral-950'} to={path}>{name}</Link>
                        ))
                    }
                </div>
            </nav>

            <Outlet />
        </div>
    )
}

const TmdbMovieGrid = ({type}: {type: string}) => {
    const [page, setPage] = useState(1);

    const { data, isError, isLoading } = useTmdbFetch<MovieResponse>(`/movie/${type}?language=en-US&page=${page}`);

    return (
        <div className="flex flex-col gap-4 items-center">
            <div className="flex flex-row gap-4 items-center">
                <button className="disabled:cursor-not-allowed" disabled={page <= 1} onClick={() => { setPage(page - 1) }}>Prev</button>
                <p>{page}</p>
                <button onClick={() => { setPage(page + 1) }}>Next</button>
            </div>

            {
                isError ? <p>Error</p> : (
                    isLoading ? <p>Loading...</p> : <MovieGrid movies={data!.results} />
                )
            }
        </div>
    )
};

const MovieDescriptionPage = () => {
    const params = useParams();
    if (!params.movieId) return <p>Invalid request</p>

    return <MovieDescription movieId={parseInt(params.movieId)} />
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
    },
    {
        path: '/movie/:movieId',
        element: <MovieDescriptionPage />,
    }
])

const App = () => {
    return <RouterProvider router={router} />
}

export default App
