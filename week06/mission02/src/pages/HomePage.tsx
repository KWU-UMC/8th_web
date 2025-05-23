import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useInView } from "react-intersection-observer";

import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enum/common";

import SearchInput from "../components/common/SearchInput";
import SortButtons from "../components/lp/SortButtons";
import LpGrid from "../components/lp/LpGrid";
import SkeletonGrid from "../components/common/SkeletonGrid";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [order, setOrder] = useState(PAGINATION_ORDER.desc);

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(10, debouncedSearch, order);

  {
    lps?.pages.map((page) => console.log(page.data.data));
  }
  // ✅ 무한스크롤을 위한 데이터 평탄화

  const flattenedData = lps?.pages.flatMap((page) => page.data.data) ?? [];

  // 📍 react-intersection-observer hook
  const { ref: bottomRef, inView } = useInView({ threshold: 1 });
  // useInView 훅을 사용하여, 스크롤이 바닥에 도달했는지 확인합니다.
  // ref로 설정된 bottomRef는 옵저버 div를 가리킵니다.
  // inView는 해당 div가 뷰포트에 들어왔는지 여부를 나타냅니다.

  // observer div를 ref로 설정하여, 해당 div가 뷰포트에 들어오면 fetchNextPage()를 호출합니다.
  // 이 div는 스켈레톤과 함께 사용되어, 마지막 페이지에 도달했을 때 스켈레톤이 보이도록 합니다.

  // ✅ 무한스크롤 트리거
  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);
  return (
    <div className="mt-20 flex flex-col items-center space-y-4">
      <SortButtons order={order} setOrder={setOrder} />
      <SearchInput value={search} onChange={setSearch} />

      {isPending && <div>검색 중입니다...</div>}
      {isError && <div>에러 발생</div>}

      {flattenedData.length > 0 && <LpGrid lps={flattenedData} />}

      {/* 📍 스켈레톤 + 옵저버 div 같이 */}
      {hasNextPage && (
        <div ref={bottomRef} className="w-full">
          <SkeletonGrid />
        </div>
        // ✅ 스켈레톤을 보여줍니다.
        // 이 div는 옵저버로 설정되어, 스크롤이 바닥에 도달했을 때 fetchNextPage()를 호출합니다.
      )}
    </div>
  );
};

export default HomePage;
