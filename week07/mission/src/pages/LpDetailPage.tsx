import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios";
import { getCommentsByLpId, postComment } from "../apis/comments";
import { LpDetail } from "../types/lp";
import { postLike, postUnlike, deleteLp } from "../apis/lp";
import { FaHeart } from "react-icons/fa";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useState, useEffect, useRef } from "react";

const LpDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [commentInput, setCommentInput] = useState("");

  const getLpDetail = async (lpId: string): Promise<LpDetail> => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
    return data.data;
  };

  const {
    data: lp,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["lpDetail", id],
    queryFn: () => getLpDetail(id!),
    enabled: !!id,
  });

  const {
    data: commentPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useInfiniteQuery({
  queryKey: ["comments", id],
  queryFn: ({ pageParam = 0 }) => getCommentsByLpId(id!, pageParam),
  getNextPageParam: (lastPage) => lastPage.hasNext ? lastPage.nextCursor : undefined,
  initialPageParam: 0,
  enabled: !!id,
});
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [observerRef.current, hasNextPage]);

  const { data: myInfo } = useQuery<ResponseMyInfoDto>({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
  });

  const isLiked = lp?.likes?.some((like) => like.userId === myInfo?.id);

  const handleLikeLp = async () => {
    try {
      if (!id) return;
      if (isLiked) {
        await postUnlike(Number(id));
      } else {
        await postLike(Number(id));
      }
      await refetch();
    } catch (err) {
      alert("좋아요 요청 중 오류 발생");
      console.log(err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      if (!lp) return;
      await deleteLp(lp.id);
      alert("삭제되었습니다");
      navigate("/");
    } catch (e) {
      alert("삭제 실패");
      console.log(e);
    }
  };

  const commentMutation = useMutation({
    mutationFn: ({ lpId, content }: { lpId: number; content: string }) =>
      postComment(lpId.toString(), { content }),
    onSuccess: () => {
      setCommentInput("");
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
    },
  });

  if (isPending) return <div className="mt-24 text-white text-center">로딩 중...</div>;
  if (isError || !lp) return <div className="mt-24 text-red-400 text-center">LP 정보를 불러올 수 없습니다.</div>;

  const comments = commentPages?.pages.flatMap((page) => page.data)?? [];

  return (
    <>
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
                <span key={tag.id} className="bg-gray-200 px-2 py-1 rounded text-xs">
                  # {tag.name}
                </span>
              ))}
            </div>

            <div className="flex space-x-4">
              {myInfo?.id === lp.author.id && (
                <>
                  <button
                    className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => navigate(`/lp/${lp.id}/edit`)}
                  >
                    수정
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    삭제
                  </button>
                </>
              )}
              <button
                onClick={handleLikeLp}
                className="px-4 py-2 rounded flex border-2 border-gray-300 items-center gap-2"
              >
                <FaHeart color={isLiked ? "red" : "gray"} />
                {lp.likes.length}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-10 mt-10">
        <hr className="my-12 border-t border-gray-300" />
        <h2 className="text-xl font-semibold mb-4">댓글</h2>

        {isCommentsLoading && <p className="text-gray-600">댓글 불러오는 중...</p>}
        {isCommentsError && <p className="text-red-400">댓글을 불러오는 데 실패했습니다.</p>}
        {comments.length === 0 && <p className="text-gray-500">아직 댓글이 없습니다.</p>}

        <div className="mb-6">
          <textarea
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className="w-full border p-2 rounded text-sm"
            placeholder="댓글을 입력하세요"
          />
          <button
            onClick={() => commentMutation.mutate({ lpId: Number(id), content: commentInput })}
            disabled={commentMutation.isPending || !commentInput.trim()}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
          >
            {commentMutation.isPending ? "등록 중..." : "등록"}
          </button>
        </div>

        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="p-4 border border-gray-200 rounded-md">
              <div className="text-xs text-gray-400">
                {comment.author.name} ・ {new Date(comment.createdAt).toLocaleDateString()}
              </div>
              <p className="text-sm text-gray-700 mb-1">{comment.content}</p>
            </li>
          ))}
        </ul>

        {/* 무한스크롤 트리거 div */}
        <div ref={observerRef} className="h-10"></div>
        {isFetchingNextPage && <p className="text-gray-500">댓글 더 불러오는 중...</p>}
      </div>
    </>
  );
};

export default LpDetailPage;
