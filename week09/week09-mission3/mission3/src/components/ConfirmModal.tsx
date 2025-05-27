import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../slices/modalSlice';
import type { RootState } from '../store/store';
import { useCartActions } from '../hooks/useCartStore';

const ConfirmModal = () => {
  const dispatch = useDispatch();
  const {clearCart}=useCartActions();
  const { isOpen, type } = useSelector((state: RootState) => state.modal);

  if (!isOpen || type !== 'clearCart') return null;

  const handleNo = () => dispatch(closeModal());
  const handleYes = () => {
    clearCart();
    dispatch(closeModal());
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-white p-6 rounded shadow text-center">
        <p className="mb-4">정말 삭제하시겠습니까?</p>
        <button onClick={handleNo} className="px-4 py-2 mr-2 bg-gray-200 rounded">아니요</button>
        <button onClick={handleYes} className="px-4 py-2 bg-red-500 text-white rounded">네</button>
      </div>
    </div>
  );
};

export default ConfirmModal; 