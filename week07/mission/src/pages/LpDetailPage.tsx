import { useParams } from "react-router-dom";
import { useGetLpDetail } from "../hooks/queries/useGetLpDetail";
import { formatDistanceToNow } from "date-fns";
import { FaEdit, FaHeart, FaTrash } from "react-icons/fa";
import CommentSection from "../components/comment/CommentSection";
import { useAuth } from "../context/AuthContext";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import LpEditModal from "../components/lp/LpEditModal";
import { useState } from "react";
import useDeleteLp from "../hooks/mutations/useDeleteLp";
const DEFAULT_AVATAR_URL =
  "https://api.dicebear.com/6.x/identicon/svg?seed=default";
const DEFAULT_AUTHROR_NAME = "익명";

const LpDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const id = Number(lpId);
  console.log("삭제할 lpId:", id); // LpDetailPage.tsx

  const { accessToken } = useAuth();

  const { data: me } = useGetMyInfo(accessToken);

  const { data: lp, isLoading, isError } = useGetLpDetail(id);

  const { mutate: likeMutate } = usePostLike();
  // 좋아요를 추가하는 뮤테이션을 사용합니다.
  // usePostLike 훅을 사용하여 좋아요를 추가하는 뮤테이션을 가져옵니다.
  const { mutate: dislikeMutate } = useDeleteLike();
  // 좋아요를 추가하거나 삭제하는 뮤테이션을 사용합니다.
  // 좋아요를 추가하는 뮤테이션은 usePostLike 훅을 사용하고, 삭제하는 뮤테이션은 useDeleteLike 훅을 사용합니다.
  const [isEditOpen, setIsEditOpen] = useState(false);
  // 좋아요 상태를 관리하기 위한 상태입니다.
  // 좋아요 상태는 LP의 좋아요 목록에 현재 사용자의 ID가 포함되어 있는지 여부로 결정됩니다.

  const { mutate: deleteLpMutate } = useDeleteLp(id);
  // LP를 삭제하는 뮤테이션을 사용합니다.
  // useDeleteLp 훅을 사용하여 LP를 삭제하는 뮤테이션을 가져옵니다.
  // 만약 삭제 완료후 홈으로 이동하고 싶다면, useNavigate 훅을 사용하여 navigate("/")를 호출하면 됩니다.\

  const handleDelete = () => {
    const confirmed = window.confirm("정말 이 LP를 삭제하시겠습니까?");
    if (confirmed) {
      deleteLpMutate();
    }
  };

  const isLiked = lp?.likes
    .map((like) => like.userId)
    .includes(me?.data.id as number);
  // 좋아요 상태를 확인하기 위해, 현재 사용자의 ID가 LP의 좋아요 목록에 포함되어 있는지 확인합니다.
  // 만약 포함되어 있다면, isLiked는 true가 됩니다.

  const handleLikeLp = () => {
    likeMutate({ lpId: id });
  };
  const handledislikeLp = () => {
    dislikeMutate({ lpId: id });
  };

  if (isLoading) return <div className="text-center mt-10">불러오는 중...</div>;
  if (isError || !lp)
    return <div className="text-center mt-10">에러가 발생했습니다.</div>;

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4 py-6 bg-gray-900 text-white rounded-xl shadow-md space-y-6">
      {/* 작성자 & 액션 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={
              lp?.authorId === me?.data.id
                ? me?.data.avatar || DEFAULT_AVATAR_URL
                : DEFAULT_AVATAR_URL
            }
            alt="작성자 아바타"
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="font-semibold">
            {lp?.authorId === me?.data.id
              ? me?.data.name
              : DEFAULT_AUTHROR_NAME}
          </span>
        </div>
        <div className="flex items-center gap-3 text-gray-300">
          <button onClick={() => setIsEditOpen(true)} title="수정">
            <FaEdit className="hover:text-blue-400" />
          </button>
          <button onClick={handleDelete} title="삭제">
            <FaTrash className="hover:text-red-400" />
          </button>
        </div>
      </div>

      {/* 썸네일 */}
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full rounded-lg shadow-lg"
      />

      {/* 제목 */}
      <h1 className="text-3xl font-bold">{lp.title}</h1>

      {/* 작성일 */}
      <p className="text-sm text-gray-400">
        {formatDistanceToNow(new Date(lp.createdAt))} 전
      </p>

      {/* 본문 */}
      <p className="text-base text-gray-200 whitespace-pre-line">
        {lp.content}
      </p>
      {/* 태그 */}
      <div className="flex flex-wrap gap-2">
        {lp.tags.map((tag) => (
          <span
            key={tag.id}
            className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-700 hover:bg-gray-700 transition"
          >
            #{tag.name}
          </span>
        ))}
      </div>

      {/* 좋아요 button*/}
      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={isLiked ? handledislikeLp : handleLikeLp}
          className="flex items-center gap-2"
        >
          <FaHeart color={isLiked ? "red" : "gray"} />
        </button>
        <span className="text-sm text-gray-400">
          {lp.likes.length}명이 좋아합니다
        </span>
      </div>

      <CommentSection lpId={id} />
      <LpEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        lpId={id}
        defaultValues={{
          title: lp.title,
          content: lp.content,
          thumbnail: lp.thumbnail,
          tags: lp.tags.map((tag) => tag.name),
          published: lp.published,
        }}
      />
    </div>
  );
};

export default LpDetailPage;
