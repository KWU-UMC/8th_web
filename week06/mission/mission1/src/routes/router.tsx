import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Detail from "../pages/detail";
import App from "../App";
import Singin from "../pages/signin";
import Signup from "../pages/signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/lp/:lpID",
        element: <Detail />,
      },
      {
        path: "/signin",
        element: <Singin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
