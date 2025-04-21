import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Detail from "../pages/detail";
import App from "../App";

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
    ],
  },
]);

export default router;
