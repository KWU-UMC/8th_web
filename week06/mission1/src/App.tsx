import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import RootLayout from "../layout/root-layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OAuthCallback from "./pages/CallBack";
import MyPage from "./pages/MyPage";
import NotFound from "./pages/NotFound";
import LpDetail from "./pages/LPDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "v1/auth/google/callback",
        element: <OAuthCallback />,
      },
      {
        path: "mypage",
        element: <MyPage />,
      },
      {
        path: "lp/:lpId",
        element: <LpDetail />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
