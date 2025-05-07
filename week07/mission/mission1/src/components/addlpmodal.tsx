import { SetStateAction, useRef, useState } from "react";
import { useAuth } from "../contexts/authcontext";
import { upload_img } from "../apis/authapi";

interface AddlpmodalI {
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function Addlpmodal({ setIsModalOpen }: AddlpmodalI) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const { accessToken } = useAuth();

  const handleCloseModal = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalOpen((prev) => !prev);
    }
  };
  const handleImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await upload_img({ file, accessToken });
    setImgUrl(url.imageUrl);
  };
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const handleTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };
  const handleTagClick = () => {
    if (tag.trim() !== "") {
      setTags([...tags, tag.trim()]);
      setTag("");
    }
  };
  const handleDeleteTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div
      onClick={handleCloseModal}
      className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center"
    >
      <div
        ref={modalRef}
        className="bg-white p-[20px] rounded-md max-w-[400px] w-full shadow-[0 4px 6px rgba(0, 0, 0, 0.1)] flex justify-center items-center"
      >
        <form className="flex flex-col gap-4 [&>input]:p-2">
          <input onChange={handleImg} type="file" accept="image/*" />
          <input onChange={handleName} placeholder="LP Name" />
          <input onChange={handleContent} placeholder="LP Content" />
          <label>
            <input
              onChange={handleTag}
              className="p-2 mr-4"
              placeholder="LP Tag"
              value={tag}
            />
            <button
              onClick={handleTagClick}
              className="cursor-pointer"
              type="button"
            >
              Add
            </button>
          </label>
          <div className="w-full flex gap-4 flex-wrap overflow-y-auto">
            {tags &&
              tags?.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => handleDeleteTag(index)}
                  className="border-1 p-1 rounded-md"
                  type="button"
                >
                  {tag} X
                </button>
              ))}
          </div>
          <button
            onSubmit={handleSubmit}
            className="cursor-pointer"
            type="submit"
          >
            Add LP
          </button>
        </form>
      </div>
    </div>
  );
}
