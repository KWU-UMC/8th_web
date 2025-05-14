import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteList from "../hooks/queries/useGetInfinite";
import { useAuth } from "../context/AuthContext";
import LpSkeletonCard from "../components/LpSkeletonCard";
import AddLpModal from "../components/AddLp";

const HomePage = () => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.asc);
  const [search, setSearch] = useState("");
  const { accessToken } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    data,
    isFetching,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useGetInfiniteList(20, search, order);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  const lpList = data?.pages.flatMap((page) => page.data.data) ?? [];

  const handleCardClick = (id: number) => {
    if (!accessToken) {
      if (window.confirm("로그인 후 이용할 수 있습니다.\n로그인 화면으로 이동할까요?")) {
        navigate("/login");
      }
      return;
    }
    navigate(`/lp/${id}`);
  };

  return (
    <>
    <div className="flex">
      <div className="flex-1">
        <div className="px-6">
          <div className="flex justify-between items-center mb-6">
            <div className="space-x-2">
              <button
                onClick={() => setOrder(PAGINATION_ORDER.asc)}
                className={`w-18 py-2 rounded text-sm ${
                  order === PAGINATION_ORDER.asc ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                오래된순
              </button>
              <button
                onClick={() => setOrder(PAGINATION_ORDER.desc)}
                className={`w-18 py-2 rounded text-sm ${
                  order === PAGINATION_ORDER.desc ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                최신순
              </button>
            </div>
          </div>

          {isError && <p>데이터를 불러오지 못했습니다.</p>}

          {(isPending || (isFetching && !lpList.length)) ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, idx) => (
                <LpSkeletonCard key={idx} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {lpList.map((lp) => (
                <div
                  onClick={() => handleCardClick(lp.id)}
                  key={lp.id}
                  className="relative text-white rounded overflow-hidden transform transition duration-300 hover:scale-105 group"
                >
                  <img
                    src={lp.thumbnail}
                    alt={lp.title}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100
                    transition-opacity duration-300 flex flex-col justify-end items-start p-4 space-y-1">
                    <h3 className="text-sm font-bold">{lp.title}</h3>
                    <p className="text-sm mt-1">
                      [업로드 날짜] {new Date(lp.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm">[Likes] {lp.likes?.length || 0}개</p>
                  </div>                </div>
              ))}
            </div>
          )}

          <div ref={ref} className="h-10" />
          {isFetching && <p className="text-center mt-4">불러오는 중...</p>}
        </div>
      </div>
    </div>

    <button
      onClick={() => setIsModalOpen(true)}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gray-700 text-white text-3xl rounded-full shadow-lg z-40"
    >
      +
    </button>
    {isModalOpen && <AddLpModal onClose={() => setIsModalOpen(false)} />}
  </>

  );
};

export default HomePage;
