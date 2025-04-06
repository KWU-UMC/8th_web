import './App.css'
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage';

//v5 -> BrowserRouter
//v6 -> createBrowserRouter
//v7 -> react-router-dom (remix, next.js)

const router = createBrowserRouter([
  {
    path:'/',
    element: <HomePage/>,
    errorElement: <NotFoundPage/>,
    children: [
      {
        path:"movies/:category",
        element: <MoviePage />,
      },
    ]
  },
]);


function App() {
  return <RouterProvider router={router}/>;
}

export default App
