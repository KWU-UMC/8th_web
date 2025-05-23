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
}

const CommentList = ({
  comments,
  fetchNextPage,
  hasNextPage,
  isFetching,
}: Props) => {
  const { ref, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    console.log("👀 inView:", inView);
    console.log("🔄 hasNextPage:", hasNextPage);
    console.log("⌛ isFetching:", isFetching);

    if (inView && hasNextPage && !isFetching) {
      console.log("🚀 fetchNextPage triggered");
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  return (
    <div className="w-full space-y-4">
      {comments.map((comment, idx) => {
        const isLast = idx === comments.length - 1;
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
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-white">
                  {comment.author.name}
                </span>
                <span className="text-xs text-gray-300">
                  {formatDistanceToNow(new Date(comment.createdAt))} 전
                </span>
              </div>
              <p className="text-gray-200">{comment.content}</p>
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
