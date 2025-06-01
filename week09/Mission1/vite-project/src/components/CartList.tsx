import CartItem from "./CartItem";
import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlice";

const CartList = () => {
    const {cartItems}= useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleClearList = () => {
        dispatch(clearCart());
    }

    return(
        <div className="flex flex-col item-center justify-center"> 
            <ul>
                {cartItems.map((item) =>(
                    <CartItem key={item.id} lp={item}/>
                ))} 
            </ul>
            <div className="flex justify-center items-center py-5">
                <button
                    onClick={handleClearList}
                    className="flex items-center p-4 border rounded border-gray-600 text-medium text-gray-600 font-semibold">
                    전체 삭제
                </button>
            </div>
        </div>
    );
}

export default CartList;