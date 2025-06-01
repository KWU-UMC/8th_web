import CartItem from "./CartItem";
import type { RootState } from "../store/store";
import { useAppSelector } from "../hooks/useCustomRedux";

const CartList = () => {
  // Redux 상태에서 cartItems, amount, total을 가져온다
  const { cartItems } = useAppSelector((state: RootState) => state.cart);

  return (
    <div className="flex flex-col items-center justify-center">
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  );
};

export default CartList;
