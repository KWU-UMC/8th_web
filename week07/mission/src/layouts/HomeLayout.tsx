import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import ConfirmModal from "../components/common/ConfirmModal";
import useDeleteUser from "../hooks/mutations/useDeleteUser";

const HomeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: deleteUser } = useDeleteUser();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleClickOutside = (e: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  // 화면 크기 작아지면 사이드바 닫기
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-dvh flex flex-col">
      {/* 최상단 네브바 */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* ✅ 중앙에서 모달 렌더링 */}
      <ConfirmModal
        isOpen={isModalOpen}
        message="정말 탈퇴하시겠습니까?"
        onCancel={() => setIsModalOpen(false)}
        onConfirm={() => {
          deleteUser();
          setIsModalOpen(false);
        }}
      />

      <div className="flex flex-1 relative">
        {/* 오버레이 */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black opacity-50 z-30 md:hidden" />
        )}

        {/* 사이드바 */}
        <div
          ref={sidebarRef}
          className={`fixed left-0 top-16 z-40 h-[calc(100%-4rem)] w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar onDeleteClick={() => setIsModalOpen(true)} />
        </div>

        {/* 메인 컨텐츠 */}
        <main
          className={`flex-1 p-4 overflow-auto mt-16 transition-all duration-300 ${
            isSidebarOpen && window.innerWidth >= 768 ? "ml-64" : ""
          }`}
        >
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default HomeLayout;
