import { useRef } from "react";

interface AddLpModalProps {
  onClose: () => void;
}

const AddLpModal = ({ onClose }: AddLpModalProps) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    inputFileRef.current?.click();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // 모달 외부 클릭 시 닫기
    >
      <div
        className="bg-[#1f1f1f] p-6 rounded-lg relative w-[400px]"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫기 방지
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white text-xl"
        >
          ×
        </button>

        {/* LP 이미지 클릭 시 input 열기 */}
        <div className="flex justify-center my-4">
          <img
            src="/vinyl-placeholder.png" // 임시 이미지
            alt="LP"
            onClick={handleImageClick}
            className="w-24 h-24 rounded-full cursor-pointer"
          />
        </div>

        <input
          type="file"
          accept="image/*"
          ref={inputFileRef}
          style={{ display: "none" }}
          onChange={(e) => {
            console.log("파일 선택됨:", e.target.files?.[0]);
          }}
        />

        <input
          type="text"
          placeholder="LP Name"
          className="w-full mb-2 p-2 rounded bg-black text-white"
        />
        <input
          type="text"
          placeholder="LP Content"
          className="w-full mb-2 p-2 rounded bg-black text-white"
        />
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="LP Tag"
            className="flex-1 p-2 rounded bg-black text-white"
          />
          <button className="px-3 py-2 bg-gray-600 text-white rounded">Add</button>
        </div>
        <button className="w-full bg-gray-400 text-black p-2 rounded">Add LP</button>
      </div>
    </div>
  );
};

export default AddLpModal;
