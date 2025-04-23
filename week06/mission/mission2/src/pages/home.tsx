import { lps } from "../apis/lpapi";
import { useInfiniteQuery } from "@tanstack/react-query";
import Item from "../components/item";
import { useCallback, useEffect, useRef, useState } from "react";
import { LP } from "../types/lptype";

export default function Home() {
  const [isASC, setIsASC] = useState<boolean>(true);
  const [data, setData] = useState<LP[]>([]);

  const {
    data: infiniteData,
    fetchNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["lps", isASC],
    queryFn: ({ pageParam = 0 }) =>
      lps({ cursor: pageParam, order: isASC ? "asc" : "desc" }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage?.hasNext ? lastPage.nextCursor : undefined;
    },
  });

  useEffect(() => {
    const merged =
      infiniteData?.pages.flatMap((page) => page?.data ?? []) ?? ([] as LP[]);
    setData(merged);
  }, [infiniteData]);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        fetchNextPage();
      }
    },
    [fetchNextPage]
  );
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
      observer.disconnect();
    };
  }, [handleObserver]);

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
      <div ref={observerRef} className="w-full h-2 bg-transparent" />
    </div>
  );
}
