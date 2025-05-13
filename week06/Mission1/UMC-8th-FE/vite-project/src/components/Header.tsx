import { PAGINATION_ORDER } from "../enums/common";

interface HeaderProps {
  order: PAGINATION_ORDER;
  setOrder: (order: PAGINATION_ORDER) => void;
}

const Header = ({ order, setOrder }: HeaderProps) => {
    return (
        <div className="space-x-2">
            <button
            onClick={() => setOrder(PAGINATION_ORDER.asc)}
            className={`px-4 py-1 rounded ${
            order === PAGINATION_ORDER.asc
                ? "bg-white text-black"
                : "bg-gray-700"
            }`}
            >
            오래된순
            </button>
            <button
            onClick={() => setOrder(PAGINATION_ORDER.desc)}
            className={`px-4 py-1 rounded ${
            order === PAGINATION_ORDER.desc
                ? "bg-white text-black"
                : "bg-gray-700"
            }`}
            >
            최신순
            </button>
        </div>
    );
};

export default Header;
