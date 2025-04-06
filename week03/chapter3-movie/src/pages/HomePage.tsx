import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};
// Outlet은 부모 컴포넌트에서 자식 컴포넌트를 렌더링할 수 있게 해주는 컴포넌트
export default HomePage;
