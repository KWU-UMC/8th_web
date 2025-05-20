import { SetStateAction } from "react";

interface AddlpI {
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function Addlp({ setIsModalOpen }: AddlpI) {
  return (
    <div
      onClick={() => setIsModalOpen((prev) => !prev)}
      className="fixed bottom-20 right-20 z-30 w-20 h-20 bg-yellow-200 rounded-full flex justify-center items-center text-3xl cursor-pointer"
    >
      +
    </div>
  );
}
