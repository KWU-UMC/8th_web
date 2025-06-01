// ✅ components/Modal.tsx
import { useModalStore } from "../hooks/useModalStore";
import { useCartActions } from "../hooks/useCartStore";

const Modal = () => {
  const { isOpen, closeModal } = useModalStore();
  const { clearCart } = useCartActions();

  if (!isOpen) return null;

  const handleConfirm = () => {
    clearCart();
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center w-[300px]">
        <p className="text-lg font-semibold mb-4">정말 삭제하시겠습니까?</p>
        <div className="flex justify-around">
          <button
            onClick={closeModal}
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
