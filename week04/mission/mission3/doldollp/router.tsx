import { createBrowserRouter } from "react-router-dom";
import Home from "./src/pages/home";
import App from "./src/App";
import Login from "./src/pages/login";

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
    ],
  },
]);
