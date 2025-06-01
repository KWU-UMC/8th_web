// import { useDispatch, useSelector } from "../hooks/useCustomRedux";
// import { openModal } from "../slices/modalSlice";
import { useCartStore } from "../store/useCartStore";
import { useModalStore } from "../store/useModalStore";

const PriceBox = () => {
  const { total } = useCartStore();
  const openModal = useModalStore((state) => state.openModal);

  return (
    <div className="p-12 flex flex-col justify-center items-center">
      <button
        onClick={openModal}
        className="bg-gray-200 text-xl font-bold text-gray-700 rounded-l hover:bg-gray-300 cursor-pointer px-10 py-4 rounded-md cursor-pointer mb-5"
      >
        전체 삭제
      </button>
      <div className="text-l font-semibold underline underline-offset-4">
        총 가격: ₩ {total}
      </div>
    </div>
  );
};

export default PriceBox;
