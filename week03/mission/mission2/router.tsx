import { createBrowserRouter } from "react-router-dom";
import App from "./src/App";
import React from "react";
import Popular from "./src/pages/popular";
import Upcoming from "./src/pages/upcoming";
import Toprated from "./src/pages/toprated";
import Nowplaying from "./src/pages/nowplaying";
import Errorpage from "./src/pages/errorpage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Errorpage />,
    children: [
      {
        path: "/popular",
        element: <Popular />,
      },
      {
        path: "/upcoming",
        element: <Upcoming />,
      },
      {
        path: "/toprated",
        element: <Toprated />,
      },
      {
        path: "/nowplaying",
        element: <Nowplaying />,
      },
    ],
  },
]);
