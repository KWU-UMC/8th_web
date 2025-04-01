import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MoviesPage from './pages/MoviesPage';
import ErrorPage from './pages/ErrorPage';
import DetailPage from './pages/DetailPage';
import RootLayout from './layout/root-layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <MoviesPage /> },  
      { path: 'movies/:category', element: <MoviesPage /> },  
      {
        path: 'movies/detail/:movieId', element: <DetailPage />
      }
    ],
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <div className="min-h-screen bg-[#0C0C0C] ">
      <RouterProvider router={router} />
    </div>
  );
}

export default App