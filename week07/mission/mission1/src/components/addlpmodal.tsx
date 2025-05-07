import { SetStateAction, useRef, useState } from "react";
import { useAuth } from "../contexts/authcontext";
import { upload_img } from "../apis/authapi";
import { useMutation } from "@tanstack/react-query";
import { create_lp } from "../apis/lpapi";

interface AddlpmodalI {
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function Addlpmodal({ setIsModalOpen }: AddlpmodalI) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
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
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
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

  const { mutate } = useMutation({
    mutationFn: () =>
      create_lp({ accessToken, title, content, thumbnail: imgUrl, tags }),
    onSuccess: () => {
      console.log("success");
      setIsModalOpen(false);
    },
    onError: () => {
      console.log("error");
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      mutate();
    } catch (error) {
      console.error(error);
    }
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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 [&>input]:p-2"
        >
          <input onChange={handleImg} type="file" accept="image/*" />
          <input onChange={handleTitle} placeholder="LP Name" />
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
          <button className="cursor-pointer" type="submit">
            Add LP
          </button>
        </form>
      </div>
    </div>
  );
}
