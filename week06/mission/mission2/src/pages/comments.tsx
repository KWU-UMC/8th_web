import { useState } from "react";

export default function Comments() {
  const [isASC, setIsASC] = useState<boolean>(true);

  return (
    <div className="w-4/5 h-auto bg-gray-500 flex flex-col gap-6 px-10 py-10 text-white rounded-2xl">
      <div className="flex justify-between items-center">
        <span className="font-bold text-xl">댓글</span>
        <div className="flex justify-end">
          <button
            onClick={() => setIsASC(true)}
            className={`flex justify-center items-center rounded-l-lg w-25 h-5 p-4 ${
              isASC ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            오래된순
          </button>
          <button
            onClick={() => setIsASC(false)}
            className={`flex justify-center items-center rounded-r-lg w-20 h-5 p-4 ${
              isASC ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            최신순
          </button>
        </div>
      </div>
      <form className="w-full flex gap-4">
        <input
          className="flex-10 p-2 border-1 rounded-md"
          placeholder="댓글을 입력해주세요"
        />
        <button className="flex-1 bg-gray-400 rounded-xl" type="submit">
          작성
        </button>
      </form>
    </div>
  );
}
