import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enum/common";

import SearchInput from "../components/common/SearchInput";
import SortButtons from "../components/lp/SortButtons";
import LpGrid from "../components/lp/LpGrid";
import SkeletonGrid from "../components/common/SkeletonGrid";

// ✅ 추가: 모달 import
import LpCreateModal from "../components/lp/LpCreateModal";
import useDebounce from "../hooks/queries/useDebounce";
import { SEARCH_DELAY } from "../constants/delay";
import useThrottleFn from "../hooks/useThrottleFn";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, SEARCH_DELAY);
  const [order, setOrder] = useState(PAGINATION_ORDER.desc);
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ 추가: 모달 열기 상태

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(10, debouncedValue, order);

  const flattenedData = lps?.pages.flatMap((page) => page.data.data) ?? [];

  const { ref: bottomRef, inView } = useInView({ threshold: 1 });

  const throttledFetchNextPage = useThrottleFn(() => {
    console.log("🔥 fetchNextPage called at:", new Date().toISOString());
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, 1000);

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      throttledFetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, throttledFetchNextPage]);

  return (
    <div className="mt-20 flex flex-col items-center space-y-4 relative">
      <SortButtons order={order} setOrder={setOrder} />
      <SearchInput value={search} onChange={setSearch} />

      {isPending && <div>검색 중입니다...</div>}
      {isError && <div>에러 발생</div>}
      {flattenedData.length > 0 && <LpGrid lps={flattenedData} />}

      {hasNextPage && (
        <div ref={bottomRef} className="w-full">
          <SkeletonGrid />
        </div>
      )}

      {/* ➕ 버튼 */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-pink-600 text-white rounded-full w-14 h-14 text-3xl shadow-lg"
      >
        +
      </button>

      {/* 🪟 LP 작성 모달 */}
      <LpCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
