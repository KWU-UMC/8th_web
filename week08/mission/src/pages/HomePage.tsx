import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import LpCard from "../components/LpCard";
import Skeleton from "../components/Skeleton";
import useAddLp from "../hooks/mutations/useAddLp";
import LpModal from "../components/LpModal";

const HomePage = () => {
  const [isASC, setIsASC] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const addLpMutation = useAddLp();
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetLpList({
    order: isASC ? "asc" : "desc",
    limit: 40,
  });

  const handleAddLP = (lpData: {
    title: string;
    content: string;
    tags: string[];
    thumbnail?: string;
    published: boolean;
  }) => {
    addLpMutation.mutate(lpData, {
      onSuccess: () => {
        alert("LP 생성 완료");
      },
      onError: (error) => {
        console.error(error);
        alert("LP 추가 중 오류 발생");
      },
    });
  };

  if (isError) return <div>에러 발생</div>;

  return (
    <div>
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setShowModal(true)}
          className="w-18 h-18 rounded-full bg-[#E91E63] text-white text-3xl hover:opacity-80"
        >
          +
        </button>
      </div>

      {showModal && (
        <LpModal onClose={() => setShowModal(false)} onAddLp={handleAddLP} />
      )}

      <div className="flex justify-end pr-10 pt-4">
        <button
          onClick={() => setIsASC(true)}
          className={`w-[100px] px-4 py-2 text-center rounded-md bg-[#E91E63] hover:opacity-70 ${
            isASC ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          오래된순
        </button>
        <button
          onClick={() => setIsASC(false)}
          className={`w-[100px] px-4 py-2 text-center rounded-md bg-[#E91E63] hover:opacity-70 ${
            !isASC ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          최신순
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-2 m-2 gap-4">
        {isPending
          ? Array.from({ length: 20 }).map((_, index) => (
              <Skeleton key={index} />
            ))
          : data?.pages.flatMap((page) =>
              page.data.data.map((lp) => <LpCard key={lp.id} lp={lp} />)
            )}
        {isFetchingNextPage &&
          Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} />)}
      </div>
    </div>
  );
};

export default HomePage;
