import { useParams } from "react-router-dom";
import { useGetLpDetail } from "../hooks/queries/useGetLpDetail";
import { Heart, Pencil, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const LpDetailPage = () => {
  const { LPid } = useParams();
  const { data, error, isLoading } = useGetLpDetail(LPid!);
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;

  const lpDetail = data?.data.data;
  if (!lpDetail) {
    return <div>상세 정보 없음</div>;
  }

  return (
    <div className="text-white flex justify-center p-6">
      <div className="bg-[#1E1E1E] rounded-2xl p-6 max-w-2xl w-full shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-5">
            <img
              src={lpDetail.author.avatar ?? "/default-avatar.png"}
              alt="작성자"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-lg font-semibold">
              {lpDetail.author.name}
            </span>
            <span className="text-sm text-white">
              {formatDistanceToNow(new Date(lpDetail.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{lpDetail.title}</h1>
          <div className="flex gap-4">
            <button className="text-gray-400 hover:text-white">
              <Pencil className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <div className="relative animate-spin-slow">
            <img
              src={lpDetail.thumbnail}
              alt="썸네일"
              className="w-80 h-80 rounded-full shadow-md object-cover cd-image"
            />
            <div className="cd-hole"></div>
          </div>
          <style>{`
    .animate-spin-slow {
      animation: spin 10s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .cd-image {
      position: relative;
    }

    .cd-hole {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 25%; 
      height: 25%;
      background-color: white;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
  `}</style>
        </div>

        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {lpDetail.content}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {lpDetail.tags && lpDetail.tags.length > 0 ? (
            lpDetail.tags.map((tag) => (
              <span
                key={tag.id}
                className="bg-[#2C2C2C] px-3 py-1 rounded-full text-sm text-white"
              >
                #{tag.name}
              </span>
            ))
          ) : (
            <span className="bg-[#2C2C2C] px-3 py-1 rounded-full text-sm text-white">
              # No tags
            </span>
          )}
        </div>

        <div className="flex items-center justify-center gap-1">
          <Heart className="w-5 h-5 text-pink-500" />
          <span className="text-sm">{lpDetail.likes.length}</span>
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;
