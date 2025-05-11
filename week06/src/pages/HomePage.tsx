import { useEffect, useState } from "react";

import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../types/common";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const {
    data: lps,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isPending,
    isError,
  } = useGetInfiniteLpList(10, search, PAGINATION_ORDER.desc);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) {
    return <div className="mt-20">Loading...</div>;
  }
  if (isError) {
    return <div className="mt-20">Error...</div>;
  }

  return (
    <div className="bg-black min-h-screen p-6">
      <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto px-4">
        {lps?.pages
          ?.map((page) => page?.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {!isFetching && <LpCardSkeletonList count={20} />}
      </div>
      <div ref={ref} className="h-10 mt-10 flex justify-center items-center">
        {isFetching && <div>Loading...</div>}
      </div>
    </div>
  );
};
export default HomePage;
