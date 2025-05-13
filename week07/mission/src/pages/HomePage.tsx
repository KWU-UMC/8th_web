import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import LpCard from "../components/LpCard";
import Skeleton from "../components/Skeleton";

const HomePage = () => {
  const [isASC, setIsASC] = useState(true);
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

  if (isError) return <div>에러 발생</div>;
  console.log("hasNextPage:", hasNextPage);
  return (
    <div>
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
