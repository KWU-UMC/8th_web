import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/home.tsx";
import NotFound from "./pages/not-found.tsx";
import Popular from "./pages/popular.tsx";
import RootLayout from "../layout/root-layout.tsx";
import Upcoming from "./pages/upcoming.tsx";
import TopRated from "./pages/top-rated.tsx";
import NowPlaying from "./pages/now-playing.tsx";
import MovieDetail from "./pages/movie-detail.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "popular",
        element: <Popular />,
      },
      {
        path: "upcoming",
        element: <Upcoming />,
      },
      {
        path: "top-rated",
        element: <TopRated />,
      },
      {
        path: "now-playing",
        element: <NowPlaying />,
      },
      {
        path: "movie/:movieId",
        element: <MovieDetail />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
