import React, { useRef, useState } from "react";

interface LpModalProps {
  onClose: () => void;
  onAddLp: (lpData: {
    title: string;
    content: string;
    tags: string[];
    thumbnail?: string;
    published: boolean;
  }) => void;
}

const LpModal: React.FC<LpModalProps> = ({ onClose, onAddLp }) => {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [lpName, setLpName] = useState("");
  const [lpContent, setLpContent] = useState("");
  const [lpTag, setLpTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleLpClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (lpTag.trim() && !tags.includes(lpTag.trim())) {
      setTags([...tags, lpTag.trim()]);
      setLpTag("");
    }
  };

  const handleSubmit = () => {
    onAddLp({
      title: lpName,
      content: lpContent,
      tags,
      thumbnail: imagePreview || undefined,
      published: true,
    });
    onClose();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    >
      <div className="bg-[#2d2f37] p-6 rounded-md w-full max-w-md relative text-white">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-300 hover:text-white"
        >
          ✕
        </button>
        <div className="flex flex-col items-center mb-4">
          <img
            className="w-40 h-40 rounded-full object-cover bg-white cursor-pointer"
            src={imagePreview || ""}
            alt="엘피 이미지"
            onClick={handleLpClick}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        <input
          type="text"
          placeholder="LP Name"
          value={lpName}
          onChange={(e) => setLpName(e.target.value)}
          className="w-full mb-3 px-3 py-2 rounded bg-[#3b3d46] text-white placeholder-gray-400 focus:outline-none"
        />
        <textarea
          placeholder="LP Content"
          value={lpContent}
          onChange={(e) => setLpContent(e.target.value)}
          className="w-full mb-3 px-3 py-2 rounded bg-[#3b3d46] text-white placeholder-gray-400 focus:outline-none resize-none"
          rows={3}
        />
        <div className="flex mb-3">
          <input
            type="text"
            placeholder="LP Tag"
            value={lpTag}
            onChange={(e) => setLpTag(e.target.value)}
            className="flex-grow px-3 py-2 rounded-l bg-[#3b3d46] text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={handleAddTag}
            className="px-4 py-2 bg-[#9ca3af] rounded-r hover:bg-[#E91E63] transition-colors"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, idx) => (
            <span key={idx} className="bg-[#4b5563] px-2 py-1 rounded text-sm">
              {tag}
            </span>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-[#9ca3af] text-white py-2 rounded hover:bg-[#E91E63] transition-colors"
        >
          Add LP
        </button>
      </div>
    </div>
  );
};

export default LpModal;
