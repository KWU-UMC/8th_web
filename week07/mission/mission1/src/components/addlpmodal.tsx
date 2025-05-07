import { SetStateAction, useRef, useState } from "react";

interface AddlpmodalI {
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function Addlpmodal({ setIsModalOpen }: AddlpmodalI) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const handleCloseModal = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalOpen((prev) => !prev);
    }
  };
  const handleName = () => {};
  const handleContent = () => {};
  const handleTags = () => {};

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
          <input type="file" accept="image/*" />
          <input placeholder="LP Name" />
          <input placeholder="LP Content" />
          <label>
            <input className="p-2 mr-4" placeholder="LP Tag" />
            <button className="cursor-pointer" type="button">
              Add
            </button>
          </label>
          <button className="cursor-pointer" type="submit">
            Add LP
          </button>
        </form>
      </div>
    </div>
  );
}
