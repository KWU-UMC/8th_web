import { Link } from 'react-router-dom';
import { FaSearch, FaUser } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="w-48 bg-neutral-900 p-4">
      <Link to="/search" className="flex items-center p-2 mb-2 text-white rounded hover:bg-gray-600">
        <FaSearch className="mr-4" /> 찾기
      </Link>
      <Link to="/my" className="flex items-center p-2 mb-2 text-white rounded hover:bg-gray-600">
        <FaUser className="mr-4" /> 마이페이지
      </Link>
    </div>
  );
};

export default Sidebar;