import { useDispatch } from "../hooks/useCustomRedux";
import { decrease, removeItem } from "../slices/cartSlice";
import { increase } from "../slices/cartSlice";
import type { Lp } from "../types/cartType";

interface CartItemProps {
  lp: Lp;
}

const CartItem = ({ lp }: CartItemProps) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(increase({ id: lp.id }));
  };

  const handleDecrease = () => {
    if (lp.amount === 1) {
      dispatch(removeItem({ id: lp.id }));
      return;
    }
    dispatch(decrease({ id: lp.id }));
  };

  return (
    <div className="flex items-center p-4 border-b border-gray-200">
      <img
        src={lp.img}
        alt={`${lp.title}`}
        className="w-22 h-22 object-cover rounded mr-4"
      />
      <div className="flex-1">
        <h3 className="text-xl font-bold">{lp.title}</h3>
        <p className="text-sm font-semibold text-gray-600 mt-0.5">
          {lp.singer}
        </p>
        <p className="text-sm font-bold text-gray-600">₩ {lp.price}</p>
      </div>
      <div className="flex items-center p-10">
        <button
          onClick={handleDecrease}
          className="px-3 py-1 bg-gray-200 text-gray-500 rounded-l hover:bg-gray-300 cursor-pointer"
        >
          -
        </button>
        <span className="px-4 py-[3px] border-y border-gray-300">
          {lp.amount}
        </span>
        <button
          onClick={handleIncrease}
          className="px-3 py-1 bg-gray-200 text-gray-500 rounded-r hover:bg-gray-300 cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
