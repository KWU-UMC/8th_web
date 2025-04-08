//import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./assets/pages/HomePage";
import NotFoundPage from "./assets/pages/NotFoundPage";
import LoginPage from "./assets/pages/LoginPage";
import HomeLayout from "./assets/layouts/HomeLayout";
import SignupPage from "./assets/pages/SignupPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {index: false, element: <HomePage />},
      {path: "login", element: <LoginPage />},
      {path: "signup", element: <SignupPage />},
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
