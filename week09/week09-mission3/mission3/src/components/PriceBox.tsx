import { useDispatch } from "../hooks/useCustomRedux";
import { openModal } from "../slices/modalSlice";
import { useCartInfo } from "../hooks/useCartStore";

const PriceBox = () => {
    const {total}=useCartInfo();
    const dispatch=useDispatch();

    return (
        <div className="p-12 flex justify-between items-center max-w-2xl mx-auto">
            <button 
                onClick={() => dispatch(openModal('clearCart'))} 
                className="border p-4 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
            >
                초기화
            </button>
            <div className="text-xl font-bold">
                총 가격: {total.toLocaleString()}원
            </div>
        </div>
    );
};

export default PriceBox;