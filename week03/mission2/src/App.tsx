import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MoviesPage from './pages/MoviesPage';
import ErrorPage from './pages/ErrorPage';
import RootLayout from './layout/root-layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <MoviesPage /> },  
      { path: 'movies/:category', element: <MoviesPage /> },  
    ],
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App