import { useSelector } from "react-redux";
import cartItems from "../constants/cartItems";
import CartItem from "./CartItem";
import { RootState } from "../store/store.ts";
import { CartState } from "../slices/cartSlice";

const CartList = () => {
  const { cartItems } = useSelector(
    (state: RootState): CartState => state.cart
  );
  return (
    <div className="flex flex-col items-center justify-center ">
      <ul>
        {cartItems.map((item) => {
          return <CartItem key={item.id} lp={item} />;
        })}
      </ul>
    </div>
  );
};
export default CartList;
