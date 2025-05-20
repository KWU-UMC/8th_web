import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadImage } from "../apis/upload";
import { createLp } from "../apis/lp";

interface AddLpModalProps {
  onClose: () => void;
}

const AddLpModal = ({ onClose }: AddLpModalProps) => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const mutation = useMutation({
    mutationFn: createLp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpList"] });
      alert("LP가 성공적으로 등록되었습니다!");
      onClose();
    },
    onError: () => {
      alert("LP 등록 중 오류가 발생했습니다.");
    },
  });

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleThumbnailChange = (file: File | null) => {
    setThumbnailFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl("");
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !thumbnailFile || tags.length === 0) {
      alert("모든 항목을 입력해주세요");
      return;
    }

    const formData = new FormData();
    formData.append("file", thumbnailFile);

    try {
      const response = await uploadImage(formData);
      const imageUrl = response.data.imageUrl;

      const data = {
        title,
        content,
        thumbnail: imageUrl,
        tags,
        published: true,
      };

      mutation.mutate(data);
    } catch (err) {
      alert("이미지 업로드에 실패했습니다.");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative"
      >
        <button className="absolute top-2 right-3 text-xl" onClick={onClose}>
          ×
        </button>
        <h2 className="text-lg font-bold mb-4">LP 추가</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">썸네일 이미지 선택</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleThumbnailChange(e.target.files?.[0] || null)}
            className="w-full border p-2 rounded mb-2"
          />
          {previewUrl && (
            <div className="flex justify-center">
              <img
                src={previewUrl}
                alt="미리보기"
                className="w-24 h-24 rounded-full object-cover border"
              />
            </div>
          )}
        </div>

        <input
          type="text"
          placeholder="제목"
          className="w-full border p-2 rounded mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="내용"
          className="w-full border p-2 rounded mb-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="mb-4">
          <div className="flex gap-2 mb-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="태그 입력 후 추가"
              className="flex-1 border p-2 rounded"
            />
            <button
              type="button"
              className="bg-gray-300 px-4 rounded"
              onClick={handleAddTag}
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200 text-sm px-2 py-1 rounded flex items-center gap-1"
              >
                # {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-sm"
                >
                  X
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={mutation.isPending}
          className="w-full py-2 bg-gray-900 text-white rounded"
        >
          {mutation.isPending ? "Adding..." : "Add LP"}
        </button>
      </div>
    </div>
  );
};

export default AddLpModal;