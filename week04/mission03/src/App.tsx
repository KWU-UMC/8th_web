import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";

//1. 홈페이지
//2. 로그인 페이지
//3. 회원가입 페이지

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />, //element에는 보통 공유하는 레이아웃을 넣는다. 여기서는 navbar와 footer가 고정되어 있는 HomePage를 넣었다.
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> }, //'/'경로에서는 HomePage의 레이아웃을 유지한 채로 Home이라는 텍스트가 보여진다.
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "my", element: <MyPage /> }, //마이페이지
      //마이페이지는 로그인 후에만 접근할 수 있는 페이지이다. 즉, 로그인 후에만 보여져야 한다.
    ],
    //반면 outlet에는 자식 route를 넣는다. 여기서는 LoginPage가 자식 route로 들어간다.
    //즉, /login으로 접근하면 HomePage의 레이아웃을 유지한 채로 LoginPage가 보여진다.
    //outlet에 자식 route를 넣는 이유는, 자식 route가 바뀌어도 레이아웃은 유지하기 위해서이다.
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
