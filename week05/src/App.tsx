import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {PremiumWebtoon} from "./PremiumWebtoon.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <PremiumWebtoon />
    }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
