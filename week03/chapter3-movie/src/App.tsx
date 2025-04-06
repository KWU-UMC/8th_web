import "./App.css";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import MovieDetailPage from "./pages/MovieDetailPage";

//BrowserRouter v5
//CreateBrowserRouter v6

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "movies/:category",
        element: <MoviePage />,
      },
      {
        path: "movie/:movieId",
        element: <MovieDetailPage />,
      },
      // 부모 컴포넌트에서 <Outlet />을 사용하지 않으면 자식 컴포넌트가 렌더링되지 않음
      // 여기서 부모 컴포넌트는 HomePage
      // 자식 컴포넌트는 MoviePage
    ],
  },
]);

//movies/upcoming
//movies/popular
//movies/now_playing
//movies/top_rated
//movies?category=popular (위 4가지는 category에 해당)
//movies/category/{movie_id} (상세정보)

function App() {
  console.log(import.meta.env.VITE_TMDB_KEY);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
