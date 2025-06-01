// ✅ components/CartList.tsx
import CartItem from "./CartItem";
import { useCartInfo, useCartActions } from "../hooks/useCartStore";
import { useEffect } from "react";
import PriceBox from "./PriceBox";

const CartList = () => {
  const { cartItems } = useCartInfo();
  const { calculateTotals } = useCartActions();

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  return (
    <>
      <div className="flex flex-col items-center justify-center pb-32 pt-10">
        {cartItems.length === 0 ? (
          <div className="my-10">
            <p className="text-2xl font-semibold">장바구니가 비어있습니다.</p>
          </div>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <CartItem key={item.id} lp={item} />
            ))}
          </ul>
        )}
      </div>
      <PriceBox />
    </>
  );
};

export default CartList;
