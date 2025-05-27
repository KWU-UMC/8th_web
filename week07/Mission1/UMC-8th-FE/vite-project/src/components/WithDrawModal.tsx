interface WithDrawModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const WithDrawModal = ({ isOpen, onConfirm, onCancel }: WithDrawModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-[#2c2c2c] text-white p-6 rounded-md w-[300px] text-center relative">
        <button
          className="absolute top-2 right-3 text-white text-xl"
          onClick={onCancel}
        >
          ✕
        </button>
        <p className="mb-4 font-semibold">정말 탈퇴하시겠습니까?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-gray-400 px-4 py-2 rounded hover:bg-gray-500"
          >
            예
          </button>
          <button
            onClick={onCancel}
            className="bg-pink-500 px-4 py-2 rounded hover:bg-pink-600"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithDrawModal;
