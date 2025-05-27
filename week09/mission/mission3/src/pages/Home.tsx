import Cart from "../components/Cart";
import Item from "../components/Item";
import useCartStore from "../features/cart/useCartStore";
import useModalStore from "../features/modal/useModalStore";
import { useEffect } from "react";

export default function Home() {
  const { items, calculateTotals } = useCartStore();
  const { openModal } = useModalStore();

  useEffect(() => {
    calculateTotals();
  }, [calculateTotals]);

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
          onClick={openModal}
        >
          전체 삭제
        </button>
      </div>
      <Cart />
    </>
  );
}
