import { useEffect, useRef, useState } from "react";
import useGetLpList from "../hooks/useGetLpList";
import { useDebounce } from "use-debounce";
import { PAIGNATION_ORDER } from "../enum/common";

const HomePage = () => {
  const [search, setSearch] = useState("Credo");
  const [debouncedSearch] = useDebounce(search, 300); // 300ms 디바운스
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, isPending, isError } = useGetLpList({
    search: debouncedSearch,
    //디바운싱은 사용자가 입력을 멈춘 후 일정 시간이 지난 뒤에만 실제 동작(예: API 호출)이 실행되도록 만드는 기술
    //이렇게 하면 사용자가 입력하는 동안 API 호출이 너무 자주 발생하지 않도록 방지할 수 있다.
    order: PAIGNATION_ORDER.asc,
  });

  useEffect(() => {
    inputRef.current?.focus(); // 자동 포커싱
  }, []);

  return (
    <div className="mt-20 flex flex-col items-center space-y-4">
      <div className="relative w-full max-w-md">
        <input
          ref={inputRef}
          className="w-full border-4 border-gray-300 rounded-xl p-3 text-lg focus:outline-none focus:border-blue-500"
          value={search}
          placeholder="LP 제목을 입력하세요..."
          aria-label="LP 검색 입력"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") inputRef.current?.blur(); // 모바일 최적화
          }}
        />
        {search && (
          <button
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            onClick={() => setSearch("")}
          >
            ✕
          </button>
        )}
      </div>

      {isPending && <div>검색 중입니다...</div>}
      {isError && <div>에러가 발생했습니다.</div>}
      {data?.length === 0 && <div>결과가 없습니다.</div>}
      {data?.map((lp) => (
        <h1 key={lp.id} className="text-xl font-medium">
          {lp.title}
        </h1>
      ))}
    </div>
  );
};

export default HomePage;
