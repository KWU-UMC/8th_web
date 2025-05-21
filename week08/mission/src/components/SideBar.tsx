import { Link } from "react-router-dom";
import { deleteUser } from "../apis/auth";
import { useSidebar } from "../context/SidebarContext";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { isSidebarOpen } = useSidebar();
  const { withdraw } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleWithdraw = async () => {
  try {
    await deleteUser();
    localStorage.removeItem("accessToken");
    alert("탈퇴되었습니다.");
    window.location.href = "/";
  } catch (err) {
    alert("탈퇴에 실패했습니다.");
    console.log(err);
  }
};

  if (!isSidebarOpen) return null;

  return (
    <div className="fixed top-16 left-0 h-[calc(100%-4rem)] w-60 bg-gray-700 text-white shadow-lg z-20 flex flex-col justify-between">
      <ul className="p-4 space-y-4 text-sm">
        <li>
          <Link to="/" className="hover:text-blue-400 block">홈</Link>
        </li>
        <li>
          <Link to="/my" className="hover:text-blue-400 block">마이페이지</Link>
        </li>
        <li>
          <Link to="/search" className="hover:text-blue-400 block">검색</Link>
        </li>
      </ul>

      <div className="p-4">
        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-md transition duration-200 transform hover:scale-105"
        >
          탈퇴하기
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-30">
          <div className="bg-white text-black p-6 rounded shadow-md w-80">
            <p className="mb-4">정말 탈퇴하시겠습니까?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                아니요
              </button>
              <button
                onClick={handleWithdraw}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                예
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
