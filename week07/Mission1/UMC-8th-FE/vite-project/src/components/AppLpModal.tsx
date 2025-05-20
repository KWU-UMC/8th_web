import { useState } from "react";

interface AddLpModalProps {
  onClose: () => void;
}

const AddLpModal = ({ onClose }: AddLpModalProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [lpName, setLpName] = useState("");
  const [lpContent, setLpContent] = useState("");

  const [tagInput, setTagInput] = useState("");     // tag 입력값
  const [tags, setTags] = useState<string[]>([]);   // 등록된 tag 리스트

  const isFormValid = lpName.trim() !== "" && lpContent.trim() !== "";
  const isTagValid = tagInput.trim() !== "";

  const handleImageClick = () => {
    setShowInput(true);
  };

  const handleAddTag = () => {
    if (isTagValid) {
      setTags([...tags, tagInput.trim()]);
      setTagInput(""); // 입력 초기화
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#1f1f1f] p-6 rounded-lg relative w-[400px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white text-xl"
        >
          ×
        </button>

        {/* 이미지 */}
        <div className="flex justify-center my-4">
          <img
            src={imageUrl || "/vinyl-placeholder.png"}
            alt="LP"
            onClick={handleImageClick}
            className="w-24 h-24 rounded-full cursor-pointer object-cover"
          />
        </div>

        {showInput && (
          <input
            type="text"
            placeholder="이미지 URL을 입력하세요"
            className="w-full mb-2 p-2 rounded bg-black text-white"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        )}

        <input
          type="text"
          placeholder="LP Name"
          className="w-full mb-2 p-2 rounded bg-black text-white"
          value={lpName}
          onChange={(e) => setLpName(e.target.value)}
        />
        <input
          type="text"
          placeholder="LP Content"
          className="w-full mb-2 p-2 rounded bg-black text-white"
          value={lpContent}
          onChange={(e) => setLpContent(e.target.value)}
        />

        {/* 태그 입력 */}
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="LP Tag"
            className="flex-1 p-2 rounded bg-black text-white"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
          <button
            onClick={handleAddTag}
            disabled={!isTagValid}
            className={`px-3 py-2 rounded ${
              isTagValid ? "bg-pink-500 text-white hover:bg-pink-600" : "bg-gray-600 text-white cursor-not-allowed"
            }`}
          >
            Add
          </button>
        </div>

        {/* 태그 리스트 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="bg-pink-700 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm"
            >
              <span>{tag}</span>
              <button
                onClick={() => handleRemoveTag(index)}
                className="text-white hover:text-gray-300 text-xs"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* LP 등록 버튼 */}
        <button
          className={`w-full p-2 rounded ${
            isFormValid
              ? "bg-pink-500 text-white hover:bg-pink-600"
              : "bg-gray-400 text-black cursor-not-allowed"
          }`}
          disabled={!isFormValid}
        >
          Add LP
        </button>
      </div>
    </div>
  );
};

export default AddLpModal;
