// CommentSection.tsx
import { useState } from "react";
import CommentList from "./CommentList";
import useGetInfiniteComments from "../../hooks/queries/useGetInfiniteComments";
import { OrderType, PAGINATION_ORDER } from "../../enum/common";
import CommentSkeleton from "../common/CommentSkeleton";
import usePostComment from "../../hooks/mutations/usePostComment";
import useEditComment from "../../hooks/mutations/useEditComment";
import useDeleteComment from "../../hooks/mutations/useDeleteComment";
import useGetMyInfo from "../../hooks/queries/useGetMyInfo";
import { useAuth } from "../../context/AuthContext";

interface Props {
  lpId: number;
}

const CommentSection = ({ lpId }: Props) => {
  const [order, setOrder] = useState<OrderType>(PAGINATION_ORDER.desc);
  const [newComment, setNewComment] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  const { accessToken } = useAuth();
  const { data: me } = useGetMyInfo(accessToken);

  const {
    data: commentData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isPending,
  } = useGetInfiniteComments(lpId, order);

  const { mutate: postComment, isPending: isPosting } = usePostComment();
  const { mutate: editComment } = useEditComment(lpId);
  const { mutate: deleteComment } = useDeleteComment(lpId);

  const handleSubmit = () => {
    const trimmed = newComment.trim();
    if (!trimmed) return;

    postComment({ lpId, content: trimmed });
    setNewComment("");
  };

  const flattenedComments =
    commentData?.pages.flatMap((page) => page.data.data) ?? [];

  return (
    <section className="mt-16 bg-gray-800 p-6 rounded-xl max-w-3xl w-full mx-auto">
      <h2 className="text-xl font-bold text-white mb-4">댓글</h2>

      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="댓글을 입력해주세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
          disabled={isPosting}
        />
        <button
          onClick={handleSubmit}
          disabled={isPosting}
          className={`px-4 py-2 rounded-md text-white ${
            isPosting
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-pink-500 hover:bg-pink-600"
          }`}
        >
          {isPosting ? "작성 중..." : "작성"}
        </button>
      </div>

      <div className="flex justify-end gap-2 mb-4 text-sm">
        <button
          onClick={() => setOrder(PAGINATION_ORDER.asc)}
          className={`px-3 py-1 rounded ${
            order === "asc"
              ? "bg-blue-500 text-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          오래된순
        </button>
        <button
          onClick={() => setOrder(PAGINATION_ORDER.desc)}
          className={`px-3 py-1 rounded ${
            order === "desc"
              ? "bg-blue-500 text-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          최신순
        </button>
      </div>

      {isPending ? (
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <CommentSkeleton key={idx} />
          ))}
        </div>
      ) : (
        <CommentList
          comments={flattenedComments}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetching={isFetching}
          meId={me?.data.id}
          onEdit={({ id, content }) => {
            setEditId(id);
            setEditContent(content);
          }}
          onSaveEdit={() => {
            if (editId !== null && editContent.trim()) {
              editComment({ commentId: editId, content: editContent });
              setEditId(null);
              setEditContent("");
            }
          }}
          onDelete={(id) => deleteComment(id)}
          editId={editId}
          editContent={editContent}
          setEditContent={setEditContent}
        />
      )}
    </section>
  );
};

export default CommentSection;
