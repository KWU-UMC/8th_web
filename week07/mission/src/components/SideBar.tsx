import { Link } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";

const Sidebar = () => {
  const { isSidebarOpen } = useSidebar();

  if (!isSidebarOpen) return null;

  return (
    <div className="fixed top-16 left-0 h-[calc(100%-4rem)] w-60 bg-gray-700 text-white shadow-lg z-20">
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
    </div>
  );
};

export default Sidebar;
