import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Navbar />
    </>
  );
};

export default RootLayout;
