import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import { PaginationDto } from "../types/common";
import { PAGINATION_ORDER } from "../enums/common.ts"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.asc);

  const queryParams: PaginationDto = {
    cursor: undefined,
    order,
    limit: 50,
  };

 
  const { data, isPending, isError } = useGetLpList(queryParams);
  const lpList = data?.data?.data || [];
  const navigate = useNavigate();
  const { accessToken } = useAuth();

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
    <div className="flex">
      <div className="flex-1">
        <div className="mt-10 px-6">
          <div className="flex justify-end items-center mb-6">
            <div className="space-x-2">
              <button
                onClick={() => setOrder(PAGINATION_ORDER.asc)}
                className={`px-4 py-2 rounded ${
                  order === PAGINATION_ORDER.asc ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                오래된순
              </button>
              <button
                onClick={() => setOrder(PAGINATION_ORDER.desc)}
                className={`px-4 py-2 rounded ${
                  order === PAGINATION_ORDER.desc ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                최신순
              </button>
            </div>
          </div>

          {isPending && <p>로딩 중...</p>}
          {isError && <p>데이터를 불러오지 못했습니다.</p>}
          
          <div>
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
                    <h3 className="text-lg font-bold">{lp.title}</h3>
                    <p className="text-sm mt-1">
                      [업로드 날짜] {new Date(lp.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm">[Likes] {lp.likes?.length || 0}개</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default HomePage;
