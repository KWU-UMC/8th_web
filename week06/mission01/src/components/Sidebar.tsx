import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside
      className="w-64 h-full bg-gray-900 text-white flex flex-col px-6 py-8 space-y-6
                 fixed md:static top-0 left-0 z-50"
    >
      <h1 className="text-2xl font-bold text-pink-500">DOLIGO</h1>

      <Link
        to="/search"
        className="flex items-center gap-3 hover:text-pink-300"
      >
        <FaSearch /> 찾기
      </Link>
    </aside>
  );
};

export default Sidebar;
