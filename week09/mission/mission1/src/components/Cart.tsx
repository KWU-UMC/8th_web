import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart);
  const count = cart.items.reduce((sum, item) => sum + item.amount, 0);
  const total = cart.total;

  return (
    <div className="w-auto h-10 fixed right-50 top-10 flex justify-center items-center gap-2">
      <FaShoppingCart size={24} color="#000" />
      <span className="text-xl">
        {count}개의 아이템: {total}원
      </span>
    </div>
  );
}
