import { useSidebar } from "../contexts/sidebar";
import { IoSearchSharp } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";

export default function Sidebar() {
  const { isOpen } = useSidebar();

  return (
    <div
      className={`w-50 p-4 fixed left-0 h-screen bg-blue-100 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex gap-4 justify-start items-center">
        <IoSearchSharp />
        <span>찾기</span>
      </div>
      <div className="flex gap-4 justify-start items-center">
        <IoPerson />
        <span>마이페이지</span>
      </div>
      <div>
        <span>탈퇴하기</span>
      </div>
    </div>
  );
}
