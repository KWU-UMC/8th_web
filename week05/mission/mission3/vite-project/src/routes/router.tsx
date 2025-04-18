import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import App from "../App";
import Newlp from "../pages/newlp";
import Callback from "../pages/callback";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/v1/auth/google/callback",
        element: <Callback />,
      },
      {
        path: "/newlp",
        element: <Newlp />,
      },
    ],
  },
]);
