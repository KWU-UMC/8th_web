import { useDispatch, useSelector } from "react-redux";
import Cart from "../components/Cart";
import Item from "../components/Item";
import type { RootState } from "../app/store";
import { calculateTotals, clearCart } from "../features/cart/cartSlice";
import { useEffect } from "react";

export default function Home() {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, []);

  return (
    <>
      <div className="w-full mt-20 flex justify-center items-center flex-col gap-4">
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
      <div className="w-full flex justify-center">
        <button
          className="my-20 p-4 border-1 border-black rounded-xl cursor-pointer"
          onClick={() => {
            dispatch(clearCart());
            dispatch(calculateTotals());
          }}
        >
          전체 삭제
        </button>
      </div>
      <Cart />
    </>
  );
}
