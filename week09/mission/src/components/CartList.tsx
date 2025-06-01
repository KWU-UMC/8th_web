import CartItem from "./CartItem";
// import { useSelector } from "../hooks/useCustomRedux";
import { useCartStore } from "../store/useCartStore";

const CartList = () => {
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <div className="flex flex-col justify-center items-center">
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  );
};

export default CartList;
