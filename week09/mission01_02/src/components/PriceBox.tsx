import { useAppDispatch, useAppSelector } from "../hooks/useCustomRedux";
import { openModal } from "../slices/modalSlice";

const PriceBox = () => {
  const { total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const handleClearCart = () => {
    dispatch(openModal());
  };
  return (
    <div className="w-full bg-gray-800 py-6">
      <div className="max-w-5xl mx-auto px-6 flex justify-between items-center text-white font-medium">
        <button
          onClick={handleClearCart}
          className="border p-4 rounded-md cursor-pointer"
        >
          장바구니 초기화
        </button>
        <p className="text-2xl font-bold">총 결제 금액 : {total} won</p>
      </div>
    </div>
  );
};

export default PriceBox;
