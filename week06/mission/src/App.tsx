import './App.css'
import { createBrowserRouter, type RouteObject, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/root-layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ErrorPage from './pages/ErrorPage';
import MyPage from './pages/MyPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './layouts/protectedLayout';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';

//public
const publicRoutes:RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },  
      { path: 'login', element: <LoginPage /> },  
      { path: 'signup', element: <SignupPage /> },
      { path: '/v1/auth/google/callback', element: <GoogleLoginRedirectPage /> },
    ],
  },
];

//protected
const protectedRoutes:RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "my", element: <MyPage />},
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

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