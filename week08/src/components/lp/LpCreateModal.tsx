import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { CreateLpDto } from "../../types/lp";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LpCreateModal = ({ isOpen, onClose }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const { mutate, isPending } = useMutation<void, Error, CreateLpDto>({
    mutationFn: createLp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
      onClose();
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !thumbnail) return;

    mutate({
      title,
      content,
      thumbnail,
      tags,
      published: true,
    });
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">LP 작성</h2>
          <button onClick={onClose}>X</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="LP 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-gray-800"
          />
          <textarea
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 rounded bg-gray-800"
          />
          <input
            type="text"
            placeholder="썸네일 이미지 URL"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            className="w-full p-2 rounded bg-gray-800"
          />

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="태그 입력"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="flex-1 p-2 rounded bg-gray-800"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-3 bg-blue-600 rounded"
            >
              추가
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-1 bg-gray-700 px-2 py-1 rounded-full"
              >
                <span>#{tag}</span>
                <button type="button" onClick={() => handleRemoveTag(tag)}>
                  ❌
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 py-2 rounded"
            disabled={isPending}
          >
            {isPending ? "작성 중..." : "작성"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LpCreateModal;
