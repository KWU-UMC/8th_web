import { useAppDispatch, useAppSelector } from "../hooks/useCustomRedux";
import { closeModal } from "../slices/modalSlice";
import { clearCart } from "../slices/cartSlice";

const Modal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.modal.isOpen);

  // 안 열려 있으면 아무것도 렌더링하지 않음
  if (!isOpen) return null;

  const handleConfirm = () => {
    dispatch(clearCart()); // 장바구니 비우고
    dispatch(closeModal()); // 모달 닫기
  };

  const handleCancel = () => {
    dispatch(closeModal()); // 단순히 모달 닫기
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center w-[300px]">
        <p className="text-lg font-semibold mb-4">정말 삭제하시겠습니까??</p>
        <div className="flex justify-around">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            아니요
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
