import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MoviesPage from './pages/MoviesPage'
import RootLayout from './layout/root-layout';
import NowplayingPage from './pages/NowplayingPage';
import PopularPage from './pages/PopularPage';
import TopratedPage from './pages/TopratedPage';
import UpcomingPage from './pages/UpcomingPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <MoviesPage /> }, // 레이아웃 확인용
      {
        path: 'movies',
        element: <MoviesPage />,
        children: [
          { path: 'now_playing', element: <NowplayingPage /> },
          { path: 'popular', element: <PopularPage /> },
          { path: 'top-rated', element: <TopratedPage /> },
          { path: 'upcoming', element: <UpcomingPage /> },
        ],
      },
    ],
    errorElement: <h1>잘못된 경로</h1>
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App