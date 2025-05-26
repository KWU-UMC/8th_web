import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedLayout from "./layouts/ProtectedLayout";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LpDetailPage from "./pages/LpDetailPage";
import ThrottlePage from "./pages/ThrottlePage";

//1. 홈페이지
//2. 로그인 페이지
//3. 회원가입 페이지

// publicRoutes : 인증없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage /> },
      // 구글 로그인 리다이렉트 페이지
      {
        path: "lp/:lpId",
        element: <LpDetailPage />,
      },
      { path: "/throttle", element: <ThrottlePage /> },
    ],
  },
];

// protectedRoutes : 인증이 필요한 라우트
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    // protectedLayout을 사용하여 인증이 필요한 라우트 설정
    // protectedLayout은 로그인 페이지를 보여줄지, 아니면 protectedLayout을 보여줄지 결정하는 컴포넌트
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "my",
        element: <MyPage />,
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      // 쿼리 실패 시 재시도 횟수
      // 기본값은 3회이며, 0으로 설정하면 재시도하지 않음
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      {/* React Query Devtools는 개발 모드에서만 보이도록 설정 */}
      {/* initialIsOpen={false}는 처음에 닫혀있도록 설정 */}
    </QueryClientProvider>
  );
}

export default App;
