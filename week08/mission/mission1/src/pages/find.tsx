import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "../utils/fnc";
import { lpWithTag } from "../apis/lpapi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LP } from "../types/lptype";
import Item from "../components/item";

export default function Find() {
  const [data, setData] = useState<LP[]>([]);
  const [value, setValue] = useState("");
  const [debouncedTag, setDebouncedTag] = useState("");
  const debounceFnc = useDebounce(async (tag: string) => {
    setDebouncedTag(tag);
    await lpWithTag({ tag });
  }, 1000);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debounceFnc(newValue);
  };

  const { data: infiniteData, fetchNextPage } = useInfiniteQuery({
    queryKey: ["lpsWithTag", debouncedTag],
    queryFn: ({ pageParam = 0 }) =>
      lpWithTag({ cursor: pageParam, tag: debouncedTag }),
    enabled: !!debouncedTag,
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage?.hasNext ? lastPage.nextCursor : undefined,
  });

  useEffect(() => {
    const merged =
      infiniteData?.pages.flatMap((page) => page?.data ?? []) ?? ([] as LP[]);

    setData(merged);
  }, [infiniteData]);

  return (
    <div className="w-full mt-10 flex flex-col justify-center items-center">
      <input
        className="bg-white color-black p-4"
        value={value}
        onChange={handleChange}
      />
      <button onClick={() => fetchNextPage()}>다음 페이지</button>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 p-4 justify-items-center">
        {data?.map((lp) => (
          <Item key={lp.id} item={lp} />
        ))}
      </div>
    </div>
  );
}
