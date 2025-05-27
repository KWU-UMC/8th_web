import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { formatDistanceToNow } from "date-fns";
import { Comment } from "../../types/comment";
import CommentSkeleton from "../common/CommentSkeleton";

interface Props {
  comments: Comment[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetching: boolean;
  meId: number | undefined;
  onEdit: (arg: { id: number; content: string }) => void;
  onDelete: (id: number) => void;
  editId: number | null;
  editContent: string;
  setEditContent: (value: string) => void;
  onSaveEdit: () => void;
}

const CommentList = ({
  comments,
  fetchNextPage,
  hasNextPage,
  isFetching,
  meId,
  onEdit,
  onDelete,
  editId,
  editContent,
  setEditContent,
  onSaveEdit,
}: Props) => {
  const { ref, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  return (
    <div className="w-full space-y-4">
      {comments.map((comment, idx) => {
        const isLast = idx === comments.length - 1;
        const isOwner = meId === comment.author.id;
        const isEditing = comment.id === editId;

        return (
          <div
            key={comment.id}
            ref={isLast ? ref : undefined}
            className="flex items-start gap-3 bg-gray-700 p-4 rounded-lg shadow"
          >
            <img
              src={comment.author.avatar}
              alt={comment.author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-white">
                  {comment.author.name}
                </span>
                <span className="text-xs text-gray-300">
                  {formatDistanceToNow(new Date(comment.createdAt))} 전
                </span>
              </div>
              {isEditing ? (
                <div className="flex gap-2 items-center">
                  <input
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full px-2 py-1 rounded bg-gray-600 text-white border border-gray-500"
                  />
                  <button
                    onClick={onSaveEdit}
                    className="text-sm text-green-400 hover:underline"
                  >
                    저장
                  </button>
                </div>
              ) : (
                <p className="text-gray-200 break-words">{comment.content}</p>
              )}
              {isOwner && !isEditing && (
                <div className="flex gap-2 text-sm mt-1">
                  <button
                    onClick={() =>
                      onEdit({ id: comment.id, content: comment.content })
                    }
                    className="text-yellow-400 hover:underline"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => onDelete(comment.id)}
                    className="text-red-400 hover:underline"
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
      {isFetching && hasNextPage && (
        <div className="space-y-4 mt-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <CommentSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;
