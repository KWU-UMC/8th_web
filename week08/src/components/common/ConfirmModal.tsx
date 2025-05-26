interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal = ({
  isOpen,
  message,
  onCancel,
  onConfirm,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-[300px]">
        <p className="text-center mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600"
          >
            아니요
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-pink-500 hover:bg-pink-600"
          >
            예
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
