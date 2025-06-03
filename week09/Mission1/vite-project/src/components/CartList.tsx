import CartItem from "./CartItem";
//import { useDispatch, useSelector } from "../hooks/useCustomRedux";
//import { clearCart } from "../slices/cartSlice";
//import { closeModal, openModal } from "../slices/modalSlice";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";
import { useModalActions, useModalInfo } from "../hooks/useModalStore";

const CartList = () => {
    //const {cartItems}= useSelector((state) => state.cart);
    const {cartItems} = useCartInfo();
    const {isOpen, message} = useModalInfo();

    //const {isOpen, message} = useSelector((state) => state.modal);

    //const dispatch = useDispatch();
    const {clearCart} = useCartActions();
    const {openModal, closeModal} = useModalActions();

    const handleClearList = () => {
        // dispatch(clearCart());
        // dispatch(closeModal());
        // dispatch(closeModal());
        clearCart();
        closeModal();
    }

    const handleConfirm = () => {
        // dispatch(openModal());
        openModal();
    }

    const handleCancel = () => {
        // dispatch(closeModal());
        closeModal();
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
                    onClick={handleConfirm}
                    className="flex items-center p-4 border rounded border-gray-600 text-medium text-gray-600 font-semibold">
                    전체 삭제
                </button>
            </div>
            
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                        <p className="mb-4">{message}</p>
                        <button
                            onClick={handleClearList}
                            className="mr-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            네
                        </button>
                        
                        <button
                            onClick={handleCancel}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            아니요
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartList;