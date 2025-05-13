import { useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useDebounce } from "use-debounce";
import { PAIGNATION_ORDER } from "../enum/common";
import SearchInput from "../components/common/SearchInput";
import SortButtons from "../components/lp/SortButtons";
import LpGrid from "../components/lp/LpGrid";

const HomePage = () => {
  const [search, setSearch] = useState("Credo");
  const [debouncedSearch] = useDebounce(search, 300);
  const [order, setOrder] = useState(PAIGNATION_ORDER.desc);

  const { data, isFetching, hasNextPage, isPending, fetchNextPage, isError } =
    useGetInfiniteLpList(10, debouncedSearch, order);
  {
    data?.pages.map((page) =>
      console.log(page.data.data.map((lp) => console.log(lp)))
    );
  }
  // const flattenedData = data?.pages.flatMap((page) => page.data) ?? [];
  const flattenedData = data?.pages.flatMap((page) => page.data.data) ?? [];

  return (
    <div className="mt-20 flex flex-col items-center space-y-4">
      <SortButtons order={order} setOrder={setOrder} />
      <SearchInput value={search} onChange={setSearch} />

      {isPending && <div>검색 중입니다...</div>}
      {isError && <div>에러 발생</div>}
      {flattenedData.length > 0 && <LpGrid lps={flattenedData} />}

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetching}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isFetching ? "로딩 중..." : "더 보기"}
        </button>
      )}
    </div>
  );
};

export default HomePage;
