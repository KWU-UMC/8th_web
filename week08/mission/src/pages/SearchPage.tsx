import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useInfiniteQuery } from "@tanstack/react-query";
import useDebounce from "../hooks/useDebounce";
import useThrottle from "../hooks/useThrottle";
import { getLpList } from "../apis/lp";
import LpCard from "../components/LpCard";
import type { TResponseLpList } from "../types/TLp";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [isASC, setIsASC] = useState(true);
  const [debouncedQuery, flushDebounce] = useDebounce(query, 500);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<TResponseLpList>({
      queryKey: ["lpList", debouncedQuery, isASC],
      queryFn: ({ pageParam = 0 }) =>
        getLpList({
          cursor: pageParam as number,
          order: isASC ? "asc" : "desc",
          search: debouncedQuery,
          limit: 10,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
      enabled: debouncedQuery.length > 0,
    });

  const hasNextPageRef = useRef(hasNextPage);
  const isFetchingNextPageRef = useRef(isFetchingNextPage);

  useEffect(() => {
    hasNextPageRef.current = hasNextPage;
    isFetchingNextPageRef.current = isFetchingNextPage;
  }, [hasNextPage, isFetchingNextPage]);

  const throttledFetchNextPage = useThrottle(() => {
    if (hasNextPageRef.current && !isFetchingNextPageRef.current) {
      fetchNextPage();
    }
  }, 2000); // 2초

  useEffect(() => {
    if (!observerRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("Observer triggered, fetching next page...");
          throttledFetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [throttledFetchNextPage, hasNextPage, isFetchingNextPage]);

  // 엔터 입력시 flush 호출
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      flushDebounce();
    }
  };

  // 입력창에서 포커스 벗어날 때 flush 호출
  const handleBlur = () => {
    flushDebounce();
  };

  const items = data?.pages.flatMap((page) => page.data.data) ?? [];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex items-center gap-3 mb-4">
        <FaSearch className="flex items-center text-white rounded hover:bg-gray-600" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder="LP 검색"
          className="flex-1 bg-[#1c1c1c] text-white px-4 py-2 rounded-md border border-gray-600"
        />
      </div>

      <div className="flex justify-end gap-2 mb-6">
        <button
          onClick={() => setIsASC(true)}
          className={`w-[100px] px-4 py-2 rounded-md hover:opacity-70 ${
            isASC ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          오래된순
        </button>
        <button
          onClick={() => setIsASC(false)}
          className={`w-[100px] px-4 py-2 rounded-md hover:opacity-70 ${
            !isASC ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          최신순
        </button>
      </div>

      {status === "pending" && <p className="text-center">로딩 중...</p>}
      {status === "error" && (
        <p className="text-center text-red-500">에러가 발생했습니다.</p>
      )}
      {items.length === 0 && status === "success" && (
        <p className="text-center mt-10 text-gray-400">검색 결과 없음</p>
      )}

      {items.map((lp, index) => {
        if (index === items.length - 1) {
          return (
            <div key={lp.id} ref={observerRef}>
              <LpCard lp={lp} />
            </div>
          );
        }
        return <LpCard key={lp.id} lp={lp} />;
      })}

      {isFetchingNextPage && (
        <p className="text-center mt-4">더 불러오는 중...</p>
      )}
    </div>
  );
};

export default SearchPage;
