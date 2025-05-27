import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getLpList } from "../apis/lp";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const debouncedInput = useDebounce(search, 3000);
  const { ref, inView } = useInView();
  const navigate = useNavigate();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isError,
  } = useInfiniteQuery({
    queryKey: ["search", debouncedInput],
    queryFn: ({ pageParam = 0 }) =>
      getLpList({
        cursor: pageParam,
        limit: 12,
        search: debouncedInput,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    initialPageParam: 0,
    enabled: !!debouncedInput,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const results = data?.pages?.flatMap((page) => page.data.data) ?? [];

  return (
    <div className="px-4 pt-20">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-xl mx-auto block border border-gray-300 rounded p-2 mb-4"
      />

      {isError && <p className="text-red-500">검색 중 오류 발생</p>}
      {results.length === 0 && debouncedInput && !isFetching && <p>검색 결과 없음</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {results.map((lp) => (
          <div
            onClick={() => navigate(`/lp/${lp.id}`)}
            key={lp.id}
            className="relative text-white rounded overflow-hidden transform transition duration-300 hover:scale-105 group cursor-pointer"
          >
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="w-full aspect-square object-cover"
            />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-start p-4 space-y-1">
              <h3 className="text-sm font-bold">{lp.title}</h3>
              <p className="text-sm mt-1">
                [업로드 날짜] {new Date(lp.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm">[Likes] {lp.likes?.length || 0}개</p>
            </div>
          </div>
        ))}
      </div>

      <div ref={ref} className="h-10"></div>
      {isFetching && <p className="text-center mt-4">불러오는 중...</p>}
    </div>
  );
};

export default SearchPage;
