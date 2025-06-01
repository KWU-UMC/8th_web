import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { CartState, clearCart } from "../slices/cartSlice";

const PriceBox = () => {
  const { total } = useSelector((state): CartState => state.cart);
  const dispatch = useDispatch();
  const handleClear = () => {
    dispatch(clearCart());
  };
  return (
    <>
      <div className="flex justify-center p-12">총 가격{total}원</div>;
      <div className="flex justify-center">
        <button
          onClick={handleClear}
          className="border rounded-md text-2xl mb-10 p-4 font-semibold cursor-pointer"
        >
          전체 삭제
        </button>
      </div>
    </>
  );
};
export default PriceBox;
