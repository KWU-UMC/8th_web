import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/root-layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ErrorPage from './pages/ErrorPage';
import { AuthProvider } from './context/AuthContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },  
      { path: 'login', element: <LoginPage /> },  
      {
        path: 'signup', element: <SignupPage />
      }
    ],
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <div className="min-h-screen bg-[#0C0C0C]">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App