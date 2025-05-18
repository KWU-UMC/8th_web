import { useEffect, useRef, useState } from "react";

import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../types/common";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [tags, setTags] = useState<string[]>([]);
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

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
    <>
      <div className="bg-black min-h-screen p-6">
        <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto px-4">
          {lps?.pages
            ?.map((page) => (page as any).data.data)
            ?.flat()
            ?.map((lp) => (
              <LpCard key={lp.id} lp={lp} />
            ))}
          {!isFetching && <LpCardSkeletonList count={20} />}
        </div>

        <button
          onClick={handleOpenModal}
          className="fixed bottom-6 right-6 bg-pink-500 text-white text-3xl w-14 h-14 rounded-full shadow-lg hover:bg-pink-600"
        >
          +
        </button>
        <div ref={ref} className="h-10 mt-10 flex justify-center items-center">
          {isFetching && <div>Loading...</div>}
        </div>
      </div>
      {isModalOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center z-50">
          <div className="relative bg-zinc-900 text-white rounded-xl p-6 w-[400px] max-w-full shadow-xl">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-white text-xl hover:text-red-400"
            >
              X
            </button>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setPreviewUrl(url);
                }
              }}
              id="lp-image"
            />
            <label htmlFor="lp-image">
              <img
                src={previewUrl || "/images/default-lp.png"}
                alt="LP Preview"
                className="w-full h-full mb-5 object-cover rounded-full aspect-square border-2 border-white cursor-pointer"
              />
            </label>
            <input
              type="text"
              placeholder="LP Name"
              className="w-full mb-5 p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
            />
            <input
              type="text"
              placeholder="LP Content"
              className="w-full mb-5 p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
            />
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="LP Tag"
                value={tagInput}
                className="w-full mb-5 py-2 p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
                onChange={(e) => {
                  setTagInput(e.target.value);
                }}
              />
              <button
                onClick={handleAddTag}
                className="bg-gray-400 h-10 t-white p-2 rounded hover:bg-gray-500 "
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-700 text-white px-3 py-1 rounded-full flex items-center gap-2"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => setTags(tags.filter((t) => t !== tag))}
                    className="text-sm text-gray-300 hover:text-red-400"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full bg-gray-400 p-2 t-white rounded hover:bg-gray-500">
              Add LP
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default HomePage;
