import { lps } from "../apis/lpapi";
import { useQuery } from "@tanstack/react-query";
import Item from "../components/item";
import { useState } from "react";

export default function Home() {
  const [isASC, setIsASC] = useState<boolean>(true);

  const { data, isLoading } = useQuery({
    queryKey: ["lps", isASC],
    queryFn: () => lps({ cursor: 0, order: isASC ? "asc" : "desc" }),
  });

  if (isLoading) return null;

  return (
    <div>
      <div className="flex justify-end pr-10 pt-4">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 p-4 justify-items-center">
        {data?.map((lp) => (
          <Item key={lp.id} item={lp} />
        ))}
      </div>
    </div>
  );
}
