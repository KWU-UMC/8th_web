import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { openModal } from "../slices/modalSlice";

const PriceBox = () => {
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="p-12 flex flex-col justify-center items-center">
      <button
        onClick={() => dispatch(openModal("clearCart"))}
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
