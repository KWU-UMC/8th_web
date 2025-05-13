import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { getLp } from "../apis/lp";


const LpDetailPage = () => {
  const { lpId } = useParams();
  const { accessToken } = useAuth();
  const parsedLpId = lpId ? parseInt(lpId) : undefined;
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["lp", lpId],
    queryFn: () => getLp(parsedLpId!),
    enabled: !!lpId && !!accessToken,
  });

  if (isLoading) return <div className="text-white">로딩 중...</div>;
  if (isError || !data?.data) return <div className="text-red-500">불러오기 실패</div>;

  const lp = data.data;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-[#1e1e1e] text-white rounded-xl shadow-xl mt-10 items-center">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-full"></div>
          <span className="text-sm">{lp.author.name}</span>
        </div>
        <span className="text-sm text-gray-400">
          {new Date(lp.createdAt).toLocaleDateString("ko-KR")}
        </span>
      </div>

      <h2 className="text-2xl font-semibold my-4">{lp.title}</h2>

      <div className="flex justify-center">
        <img src={lp.thumbnail} alt={lp.title} className="w-64 h-64 object-cover" />
      </div>

      <p className="text-center mt-4 text-sm text-gray-300">{lp.content}</p>

      <div className="flex flex-wrap justify-center mt-4 gap-2">
        {lp.tags.map((tag) => (
          <span key={tag.id} className="bg-gray-700 px-2 py-1 rounded-full text-xs">
            #{tag.name}
          </span>
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-6">
        <button className="text-gray-400 hover:text-white">
          <i className="fas fa-edit"></i>
        </button>
        <button className="text-gray-400 hover:text-white">
          <i className="fas fa-trash"></i>
        </button>
        <button className="text-pink-500">
          ❤ {lp.likes.length}
        </button>
      </div>
    </div>
  );
};

export default LpDetailPage;
