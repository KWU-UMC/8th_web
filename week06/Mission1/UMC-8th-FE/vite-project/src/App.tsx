import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import HomeLayout from './layouts/HomeLayout';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './layouts/ProtectedLayout';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LpDetailPage from './pages/LpDetailPage';


//publicRoutes: 인증 업시 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout/>,
    errorElement: <NotFoundPage/>,
    children:[
      {
        path: "login",
        element: <LoginPage/>
      },
      {
        path: "signup",
        element: <SignupPage/>  
      },
      {
        path: "v1/auth/google/callback",
        element: <GoogleLoginRedirectPage/>
      }
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout/>,
    errorElement: <NotFoundPage/>,
    children:[
      {
        index: true,
        element: <HomePage/>
      },
      {
      path:"/my",
      element: <MyPage/>,
    },
    { path: "lps/:lpId", 
      element: <LpDetailPage /> 
    },
  ]
  }
]

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes])

//retry 부분 파라미터에 추가하는게 useGetLpList에서 말한거임
//이건 무조건 해라. 이 느낌임
export const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      retry: 3,
  }}
});

function App() {
  // 모든 상태를 공유하고 싶기 때문에
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    {import.meta.env.DEV && (<ReactQueryDevtools initialIsOpen={false} />)}
    </QueryClientProvider>
  );
}
//배포한경에서는 안 켜지게 할려고 위에 import.meta 하는거임

export default App
