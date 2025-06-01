import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { closeModal } from "../slices/modalSlice";
import { cleanCart } from "../slices/cartSlice";

const InitializeModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);

  if (!isOpen) return null;

  const handleCancel = () => dispatch(closeModal());

  const handleConfirm = () => {
    dispatch(cleanCart());
    dispatch(closeModal());
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm backdrop-saturate-150">
      <div className="bg-white rounded p-6 text-center shadow-lg">
        <p className="text-lg font-semibold mb-4">정말 삭제하시겠습니까?</p>
        <div className="flex justify-center gap-4">
          <button onClick={handleCancel} className="bg-gray-200 px-4 py-2 rounded">아니요</button>
          <button onClick={handleConfirm} className="bg-red-500 text-white px-4 py-2 rounded">네</button>
        </div>
      </div>
    </div>
  );
};

export default InitializeModal;
