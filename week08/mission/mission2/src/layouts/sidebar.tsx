import { forwardRef } from "react";
import { useSidebar } from "../contexts/sidebar";
import { IoSearchSharp } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
interface SidebarI extends React.HTMLProps<HTMLDivElement> {}

const Sidebar = forwardRef<HTMLDivElement, SidebarI>((props, ref) => {
  const { isOpen } = useSidebar();
  const { children, ...divProps } = props;
  const navigate = useNavigate();
  const { setIsDeleteModalOpen } = useSidebar();

  return (
    <div
      ref={ref}
      className={`[&>div]:cursor-pointer w-50 p-4 fixed left-0 h-screen bg-blue-100 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      {...divProps}
    >
      <div
        onClick={() => navigate("/find")}
        className="flex gap-4 justify-start items-center"
      >
        <IoSearchSharp />
        <span>찾기</span>
      </div>
      <div className="flex gap-4 justify-start items-center">
        <IoPerson />
        <span onClick={() => navigate("/mypage")}>마이페이지</span>
      </div>
      <div>
        <span onClick={() => setIsDeleteModalOpen(true)}>탈퇴하기</span>
      </div>
      {children}
    </div>
  );
});

export default Sidebar;
