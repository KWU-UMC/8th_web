import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Narbar";
import Footer from "../components/Footer";
import Siderbar from "../components/Siderbar";
import { useEffect, useState } from "react";

const ProtectedLayout = () => {
    const { accessToken } = useAuth();
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleToggleSearch = () => {
        setIsSearchOpen((prev) => !prev);
    };

     // 화면 크기 변경 시 데스크탑 여부 업데이트
    useEffect(() => {
        const handleResize = () => {
        const isNowDesktop = window.innerWidth >= 768;
        setIsDesktop(isNowDesktop);

      // 화면 작아지면 자동으로 닫기
        if (!isNowDesktop) {
            setIsSidebarOpen(false);
        }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 삼단바 클릭 → 무조건 토글 가능
    const handleToggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
        console.log("삼단바 클릭됨!");
    };

    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="h-dvh flex flex-col bg-black">
        <Navbar 
        onToggleSidebar={handleToggleSidebar}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen} />

        <div className="flex flex-1 bg-black">
            <div
            className={`transition-all duration-300 
                ${isSidebarOpen ? "w-[200px]" : "w-0"}
                min-w-0 flex-shrink-0 overflow-hidden bg-[#121210]`}
                >
            <Siderbar 
            isOpen={isSidebarOpen}
            onToggleSearch={handleToggleSearch} />
        </div>

        <main className="flex-1 flex-col mt-3 bg-black">
            <Outlet />
        </main>
    </div>

    <Footer />
    </div>
    );
};

export default ProtectedLayout;