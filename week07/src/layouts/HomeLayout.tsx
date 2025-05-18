import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col">
      <main className="flex-1">
        <Navbar />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default HomeLayout;
