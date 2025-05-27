import { useDispatch } from "react-redux";
import { closeModal } from "../features/modal/modalSlice";
import { clearCart } from "../features/cart/cartSlice";

export default function Modal() {
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">정말 삭제하시겠습니까?</h2>
        <div>
          <button
            className="cursor-pointer px-4 py-2 rounded-xl mr-2 bg-gray-300"
            onClick={() => dispatch(closeModal())}
          >
            아니요
          </button>
          <button
            className="cursor-pointer px-4 py-2 rounded-xl bg-red-500"
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
}
