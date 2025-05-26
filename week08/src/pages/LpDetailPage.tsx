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
  // useParams 훅을 사용하여 URL에서 lpId를 가져옵니다.
  // 상세페이지인만큼 lpId는 반드시 존재해야 하므로, 타입을 number로 변환합니다.

  const { accessToken } = useAuth();
  // 여기서 accessToken이 필요한 이유는, LP의 작성자 정보를 가져오기 위해 현재 로그인한 사용자의 정보를 조회해야 하기 때문입니다.

  const { data: me } = useGetMyInfo(accessToken);
  // 앞서 가져온 accessToken을 사용하여 현재 로그인한 사용자의 정보를 가져옵니다.

  const { data: lp, isLoading, isError } = useGetLpDetail(id);
  // useGetLpDetail 훅을 사용하여, lpId에 해당하는 LP의 상세 정보를 가져옵니다.
  // 이 훅은 LP의 제목, 내용, 작성자 정보, 좋아요 목록 등을 포함한 상세 정보를 반환합니다.
  // isLoading은 데이터가 로딩 중인지 여부를 나타내며, isError는 데이터 로딩 중 에러가 발생했는지 여부를 나타냅니다.

  const { mutate: likeMutate } = usePostLike();
  const { mutate: dislikeMutate } = useDeleteLike();
  const { mutate: deleteLpMutate } = useDeleteLp(id);

  const [isEditOpen, setIsEditOpen] = useState(false);

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
