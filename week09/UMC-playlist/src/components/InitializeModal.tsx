import { useCartStore } from '../store/useCartStore';
import { useModalStore } from '../store/useModalStore';

const InitializeModal = () => {
  const isOpen = useModalStore((state) => state.isOpen);
  const closeModal = useModalStore((state) => state.closeModal);
  const clearCart = useCartStore((state) => state.clearCart);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <p className="mb-4">정말 삭제하시겠습니까?</p>
        <div className="flex gap-4 justify-center">
          <button onClick={closeModal} className="bg-gray-200 px-4 py-2 rounded">아니요</button>
          <button onClick={() => { clearCart(); closeModal(); }} className="bg-red-500 text-white px-4 py-2 rounded">네</button>
        </div>
      </div>
    </div>
  );
};

export default InitializeModal;
