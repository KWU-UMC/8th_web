import { useParams } from "react-router-dom";
import { useGetLpDetail } from "../hooks/queries/useGetLpDetail";
import { formatDistanceToNow } from "date-fns";
import { FaHeart, FaEdit, FaTrash } from "react-icons/fa";
import CommentSection from "../components/comment/CommentSection";

const LpDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const id = Number(lpId);

  const { data, isLoading, isError } = useGetLpDetail(id);

  if (isLoading) return <div className="text-center mt-10">불러오는 중...</div>;
  if (isError || !data)
    return <div className="text-center mt-10">에러가 발생했습니다.</div>;

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4 py-6 bg-gray-900 text-white rounded-xl shadow-md space-y-6">
      {/* 작성자 & 액션 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-300" />
          <span className="font-semibold">오타니안</span>
        </div>
        <div className="flex items-center gap-3 text-gray-300">
          <button title="수정">
            <FaEdit className="hover:text-blue-400" />
          </button>
          <button title="삭제">
            <FaTrash className="hover:text-red-400" />
          </button>
        </div>
      </div>

      {/* 썸네일 */}
      <img
        src={data.thumbnail}
        alt={data.title}
        className="w-full rounded-lg shadow-lg"
      />

      {/* 제목 */}
      <h1 className="text-3xl font-bold">{data.title}</h1>

      {/* 작성일 */}
      <p className="text-sm text-gray-400">
        {formatDistanceToNow(new Date(data.createdAt))} 전
      </p>

      {/* 본문 */}
      <p className="text-base text-gray-200 whitespace-pre-line">
        {data.content}
      </p>

      {/* 태그 */}
      <div className="flex flex-wrap gap-2">
        {data.tags.map((tag) => (
          <span
            key={tag.id}
            className="bg-gray-700 text-white text-sm px-3 py-1 rounded-full"
          >
            #{tag.name}
          </span>
        ))}
      </div>

      <div className="flex items-center text-pink-400 gap-4 mt-4">
        <div className="flex items-center gap-1">
          <FaHeart />
          <span>{data.likes.length}</span>
        </div>
      </div>
      <CommentSection lpId={id} />
    </div>
  );
};

export default LpDetailPage;
