import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState, useEffect, useRef } from "react";
import Modal from "../components/Modal";
import { deleteMyinfo } from "../apis/auth";

const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const handleDeleteAccount = async () => {
    try {
      await deleteMyinfo();
      alert("탈퇴 완료");
      setShowModal(false);
      window.location.href = "/";
    } catch (error) {
      console.error("탈퇴 실패", error);
    }
  };

  // 사이드바 바깥 클릭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <div className="flex flex-col">
      <div className="h-16 z-40">
        <Navbar onToggleSidebar={toggleSidebar} />
      </div>
      <div className="flex flex-1 min-h-0 relative">
        <div className="hidden md:block">
          <Sidebar isOpen={true} onRequestDelete={() => setShowModal(true)} />
        </div>
        {isSidebarOpen && (
          <div className="block md:hidden fixed inset-0 z-40">
            <Sidebar
              isOpen={true}
              ref={sidebarRef}
              onRequestDelete={() => setShowModal(true)}
            />
          </div>
        )}
        <div className="flex-1 p-6 min-h-0">
          <Outlet />
        </div>
      </div>
      {showModal && (
        <Modal
          message="정말 탈퇴하시겠습니까?"
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default RootLayout;
