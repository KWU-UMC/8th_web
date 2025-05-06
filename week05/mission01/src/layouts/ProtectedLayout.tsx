import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  if (!accessToken) {
    return <Navigate to="/login" replace />;
    // accessToken이 없으면 로그인 페이지로 리다이렉트
    // replace는 history를 남기지 않고 현재 페이지를 대체하는 방식
    // forward로 이동할 수 없게 함
  }
  return <Outlet />;
};

export default ProtectedLayout;

// 우리가 토큰이 있냐 없냐 에 따라서
// protectedLayout을 보여줄지, 아니면 로그인 페이지를 보여줄지 결정하는 컴포넌트
// protectedLayout은 로그인 페이지를 보여줄지, 아니면 protectedLayout을 보여줄지 결정하는 컴포넌
// 사실 이 로직은 context API에서 children prop과 비슷한 역할을 한다.
