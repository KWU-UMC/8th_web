import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
const Sidebar = ({ onDeleteClick }: { onDeleteClick: () => void }) => {
  return (
    <aside className="h-full bg-gray-900 text-white flex flex-col px-6 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-pink-500">DOLIGO</h1>

      <Link
        to="/search"
        className="flex items-center gap-3 hover:text-pink-300"
      >
        <FaSearch /> 찾기
      </Link>

      {/* 🔻 탈퇴하기 버튼 */}
      <button
        onClick={onDeleteClick}
        className="mt-auto text-left hover:text-red-400"
      >
        탈퇴하기
      </button>
    </aside>
  );
};

export default Sidebar;
