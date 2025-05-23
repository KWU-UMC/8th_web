import { useState } from "react";
import CommentList from "./CommentList";
import useGetInfiniteComments from "../../hooks/queries/useGetInfiniteComments";
import { OrderType, PAGINATION_ORDER } from "../../enum/common";
import CommentSkeleton from "../common/CommentSkeleton";

interface Props {
  lpId: number;
}

const CommentSection = ({ lpId }: Props) => {
  const [order, setOrder] = useState<OrderType>(PAGINATION_ORDER.desc);

  const {
    data: commentData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isPending,
  } = useGetInfiniteComments(lpId, order);

  const flattenedComments =
    commentData?.pages.flatMap((page) => page.data.data) ?? [];

  return (
    <section className="mt-16 bg-gray-800 p-6 rounded-xl max-w-3xl w-full mx-auto">
      <h2 className="text-xl font-bold text-white mb-4">댓글</h2>

      {/* 🔽 댓글 입력창 */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="댓글을 입력해주세요"
          className="flex-1 px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
          disabled
        />
        <button
          disabled
          className="px-4 py-2 bg-pink-500 text-white rounded-md opacity-50 cursor-not-allowed"
        >
          작성
        </button>
      </div>

      {/* 🔁 정렬 버튼 */}
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

      {/* 🗒️ 스켈레톤 or 댓글 리스트 */}
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
        />
      )}
    </section>
  );
};

export default CommentSection;
