import { FaShoppingCart } from "react-icons/fa";
import useCartStore from "../features/cart/useCartStore";

export default function Cart() {
  const { items, total } = useCartStore();
  const count = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="w-auto h-10 fixed right-50 top-10 flex justify-center items-center gap-2">
      <FaShoppingCart size={24} color="#000" />
      <span className="text-xl">
        {count}개의 아이템: {total}원
      </span>
    </div>
  );
}
