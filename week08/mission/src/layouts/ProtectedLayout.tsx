import { useAuth } from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/SideBar";
import { useSidebar } from "../context/SidebarContext";

const ProtectedLayout = () => {
    const { accessToken } = useAuth();
    const { isSidebarOpen } = useSidebar();
    
  
    if (!accessToken) {
      return <Navigate to={'/login'} replace />;
    }
  
  return (
    <div className="h-dvh">
      <Navbar />
      <Sidebar />
      <div className={`pt-16 transition-all duration-300 ${isSidebarOpen ? "ml-60" : "ml-0"}`}>
        <main className="min-h-[calc(100vh-4rem-4rem)] px-4 py-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
};

export default ProtectedLayout;