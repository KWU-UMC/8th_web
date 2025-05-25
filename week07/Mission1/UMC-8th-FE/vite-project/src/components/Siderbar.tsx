import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WithDrawModal from "./WithDrawModal";
import { postLogout } from "../apis/auth";
interface SidebarProps {
    isOpen: boolean;
}


const Siderbar = ({ isOpen }: SidebarProps) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConfirm = async () => {
        setIsModalOpen(false);
        await postLogout();       // 로그아웃 실행
        navigate("/login");        // 홈으로 이동
    };
    return(
        <aside
            className={`${
                isOpen ? "block" : "hidden"
            } md:block min-w-[180px] w-[200px] h-screen bg-[#121210] text-white p-6 space-y-6 relative`}
            >
            <div className="p-4 space-y-4">
                <div className="hover:text-pink-500 cursor-pointer">🔍 찾기</div>
                <div className="hover:text-pink-500 cursor-pointer"
                onClick={() => navigate("/my")}>👤 마이페이지</div>
                <div className="bottom-6 left-6 hover:text-red-500 cursor-pointer"
                onClick={() => setIsModalOpen(true)}>
            🚪 탈퇴하기
                </div>
            </div>
            <WithDrawModal
                isOpen={isModalOpen}
                onConfirm={handleConfirm}
                onCancel={() => setIsModalOpen(false)}
            />
        </aside>
    )
};

export default Siderbar;