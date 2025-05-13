import { PAIGNATION_ORDER } from "../../enum/common";

interface SortButtonsProps {
  order: PAIGNATION_ORDER;
  setOrder: (order: PAIGNATION_ORDER) => void;
}

const SortButtons = ({ order, setOrder }: SortButtonsProps) => {
  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        onClick={() => setOrder(PAIGNATION_ORDER.asc)}
        className={`px-4 py-2 border rounded-md transition ${
          order === PAIGNATION_ORDER.asc
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
        }`}
      >
        오래된순
      </button>
      <button
        onClick={() => setOrder(PAIGNATION_ORDER.desc)}
        className={`px-4 py-2 border rounded-md transition ${
          order === PAIGNATION_ORDER.desc
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
        }`}
      >
        최신순
      </button>
    </div>
  );
};

export default SortButtons;
