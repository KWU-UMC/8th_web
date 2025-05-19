import { Link } from "react-router-dom";
import { FaSearch, FaUser } from "react-icons/fa";
import { forwardRef } from "react";

type SidebarProps = {
  isOpen: boolean;
  onRequestDelete: () => void;
};

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ isOpen, onRequestDelete }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-neutral-900 p-4 z-30 h-full w-48
          transition-transform duration-300
          md:static md:translate-x-0 md:block
          fixed top-16 left-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Link
          to="/search"
          className="flex items-center p-2 mb-2 text-white rounded hover:bg-gray-600"
        >
          <FaSearch className="mr-4" /> 찾기
        </Link>
        <Link
          to="/my"
          className="flex items-center p-2 mb-2 text-white rounded hover:bg-gray-600"
        >
          <FaUser className="mr-4" /> 마이페이지
        </Link>

        <button
          onClick={onRequestDelete}
          className="w-full text-left flex items-center p-11 text-white mt-4"
        >
          탈퇴하기
        </button>
      </div>
    );
  }
);

export default Sidebar;
