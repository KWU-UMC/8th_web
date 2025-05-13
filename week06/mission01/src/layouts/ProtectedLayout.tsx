import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  if (!accessToken) return <Navigate to="/login" replace />;

  return (
    <div className="h-dvh flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 mt-10">
        {isSidebarOpen && <Sidebar />}
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
