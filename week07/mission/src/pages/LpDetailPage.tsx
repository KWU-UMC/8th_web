import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios";
import { LpDetail } from "../types/lp";

const getLpDetail = async (lpId: string): Promise<LpDetail> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data.data;
};

const LpDetailPage = () => {
  const { id } = useParams();

  const {
    data: lp,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["lpDetail", id],
    queryFn: () => getLpDetail(id!),
    enabled: !!id,
  });

  if (isPending) return <div className="mt-24 text-white text-center">로딩 중...</div>;
  if (isError || !lp) return <div className="mt-24 text-red-400 text-center">LP 정보를 불러올 수 없습니다.</div>;

  return (
    <div className="max-w-6xl mx-auto mt-24 px-4 text-black">
    <div className="flex flex-col md:flex-row items-start gap-8">
        
        <div className="w-full md:w-1/2 flex justify-center">
        <img
            src={lp.thumbnail}
            alt={lp.title}
            className="w-full max-w-sm aspect-square object-cover rounded-xl"
        />
        </div>

        <div className="w-full md:w-1/2">
        <h1 className="text-3xl font-bold mb-2">{lp.title}</h1>
        <p className="text-sm">작성자: {lp.author.name}</p>
        <p className="text-sm mb-4">
            업로드 날짜: {new Date(lp.createdAt).toLocaleDateString()}
        </p>
        <p className="mb-6">{lp.content}</p>

        <div className="flex flex-wrap gap-2 mb-6">
            {lp.tags.map((tag) => (
            <span key={tag.id} className="bg-blue-600 px-2 py-1 rounded text-xs">#{tag.name}</span>
            ))}
        </div>

        <div className="flex space-x-4">
            <button className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded">수정</button>
            <button className="bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded">삭제</button>
            <button className="bg-pink-400 hover:bg-pink-600 text-white px-4 py-2 rounded">
            좋아요 {lp.likes.length}
            </button>
        </div>
        </div>
    </div>
    </div>

  );
};

export default LpDetailPage;
