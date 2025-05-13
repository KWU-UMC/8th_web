import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const HomeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="h-dvh flex flex-col relative">
      <Navbar toggleSidebar={toggleSidebar} />

      {/* 오버레이: 모바일에서 사이드바 바깥 클릭 시 닫기 */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <div className="flex flex-1 mt-10">
        {/* Sidebar: 데스크탑에서는 항상 보이게, 모바일은 조건부 */}
        <div className={`z-50 ${isSidebarOpen ? "block" : "hidden"} md:block`}>
          <Sidebar />
        </div>

        <main className="flex-1 p-4 overflow-auto z-0">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default HomeLayout;
