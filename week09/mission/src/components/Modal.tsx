import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../slices/modalSlice";
import { clearCart } from "../slices/cartSlice";
import type { RootState } from "../store/store";

const Modal = () => {
  const dispatch = useDispatch();
  const { isOpen, type } = useSelector((state: RootState) => state.modal);

  if (!isOpen || type !== "clearCart") return null;

  const handleNo = () => dispatch(closeModal());
  const handleYes = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-white px-17 py-15 rounded-md shadow text-center">
        <p className="text-xl font-semibold mb-7">정말 삭제하시겠습니까?</p>
        <button
          onClick={handleNo}
          className="text-l px-7 py-2 mr-2 bg-gray-200 rounded"
        >
          아니요
        </button>
        <button
          onClick={handleYes}
          className="text-l px-7 py-2 mr-2 bg-red-400 text-white rounded"
        >
          네
        </button>
      </div>
    </div>
  );
};

export default Modal;
