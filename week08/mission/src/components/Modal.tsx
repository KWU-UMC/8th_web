type ConfirmModalProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const Modal = ({ message, onConfirm, onCancel }: ConfirmModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-neutral-900 p-6 rounded shadow-md text-center w-[500px] h-auto md:h-[200px] flex flex-col justify-center">
        <p className="mb-10 text-lg text-white">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            예
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-[#E91E63] text-white rounded-md"
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
