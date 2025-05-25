import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { getLp } from "../apis/lp";
import { PAGINATION_ORDER } from "../enums/common";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useGetInifiniteCommentList from "../hooks/queries/useGetInfiniteCommentList";
import CommentSkeletonList from "../components/Comment/CommentSkeletonList";
import { usePostComment } from "../hooks/mutations/usePostComment";
import { useQueryClient } from "@tanstack/react-query";
//import { useDeleteComment } from "../hooks/mutations/useDeleteComment";
//import { useUpdateComment } from "../hooks/mutations/useUpdateComment";
import Comment from "../components/Comment/Comment";
import { deleteLike, postLike } from "../apis/like";

const LpDetailPage = () => {
  const { lpId } = useParams();
  const { accessToken } = useAuth();
  const parsedLpId = lpId ? parseInt(lpId) : undefined;
  const [commentContent, setCommentContent] = useState("");
  const postCommentMutation = usePostComment(parsedLpId!); // lpId는 이미 있음
  const queryClient = useQueryClient();
  //const deleteMutation = useDeleteComment();
  //const updateMutation = useUpdateComment();
  //const { user } = useAuth(); // 현재 로그인한 사용자 정보

  const [likeCount, setLikeCount] = useState<number>(0);
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const { ref, inView } = useInView({ threshold: 0 });
  const [liked, setLiked] = useState<boolean>(false); // ✅ 하트 상태 관리
  const { data, isLoading, isError } = useQuery({
    queryKey: ["lp", lpId],
    queryFn: () => getLp(parsedLpId!),
    enabled: !!lpId && !!accessToken,
  });

  const {
    data: commentPages,
    fetchNextPage,
    hasNextPage,
    isFetching: isCommentFetching,
  } = useGetInifiniteCommentList(parsedLpId!, order);

  useEffect(() => {
  if (inView && hasNextPage && !isCommentFetching) {
    fetchNextPage();
  }
}, [inView, hasNextPage, isCommentFetching, fetchNextPage]);

  useEffect(() => {
    if (data?.data) {
      setLikeCount(data.data.likes.length);
    }
  }, [data]);

  const tryToggleLike = async () => {
    if (!parsedLpId) return;
    try {
      await postLike(parsedLpId); // 먼저 좋아요 시도
      setLikeCount((prev) => prev + 1);
    } catch {
      try {
        await deleteLike(parsedLpId); // 실패 시 좋아요 취소
        setLikeCount((prev) => prev - 1);
      } catch (e) {
        alert("좋아요 처리 실패");
      }
    }
    queryClient.invalidateQueries({ queryKey: ["lp", lpId] });
  };

  if (isLoading) return <div className="text-white">로딩 중...</div>;
  if (isError || !data?.data) return <div className="text-red-500">불러오기 실패</div>;
  if (isCommentFetching) return <div className="text-white">로딩 중...</div>;
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
        <button
          onClick={tryToggleLike}
          className="flex items-center text-sm hover:scale-105 transition-transform"
        >
          <span className={liked ? "text-pink-500" : "text-gray-400"}>
              {liked ? "❤️" : "🤍"}
          </span>
          <span className="ml-1">{likeCount}</span>
        </button>
      </div>

      <div className="mt-8 p-4 bg-[#2a2a2a] rounded-md">
        <div className="flex justify-between mb-2">
          <span className="text-white font-semibold">💬 댓글</span>
          <div className="space-x-2">
            <button onClick={() => setOrder(PAGINATION_ORDER.asc)}
              className={`px-4 py-1 rounded-md border ${
                order === PAGINATION_ORDER.asc
                  ? "bg-white text-black"
                  : "bg-black text-white"
                }`}>
              오래된순
            </button>
            <button
              onClick={() => setOrder(PAGINATION_ORDER.desc)}
              className={`px-4 py-1 rounded-md border ${
              order === PAGINATION_ORDER.desc
                ? "bg-white text-black"
                : "bg-black text-white"
                }`}>
              최신순
            </button>
      </div>
    </div>
    <div className="flex py-2">
       <input
    type="text"
    placeholder="댓글을 입력해주세요."
    className="flex-1 bg-[#2a2a2a] text-white text-sm 
    px-4 py-2 rounded-md placeholder-gray-400 border border-gray-500"
    value={commentContent}
    onChange={(e) => setCommentContent(e.target.value)}
  />
  <span className="px-2">
    <button
      onClick={() => {
        if (!commentContent.trim()) return;
        postCommentMutation.mutate(
          { content: commentContent.trim() },
          {
            onSuccess: () => {
              setCommentContent(""); // 입력창 초기화
              queryClient.invalidateQueries({
                queryKey: ["comments", parsedLpId],
              });
            },
            onError: () => {
              alert("댓글 등록 실패");
            },
          }
        );
      }}
      className={`text-white text-sm px-4 py-2 rounded-md ${
        commentContent.trim()
          ? "bg-pink-500 hover:bg-pink-600"
          : "bg-gray-500 cursor-not-allowed"
      }`}
      disabled={!commentContent.trim()}
    >
      작성
    </button>
  </span>
    </div>

    <div className="space-y-3">
      {commentPages?.pages.flatMap((page) => page.data.data)
    .map((comment) => (
      <Comment key={comment.id} cms={comment} lpId={parsedLpId!} />
  ))}

      {isCommentFetching && <CommentSkeletonList count={10} /> && <div className="text-gray-400">로딩 중...</div>}
    </div>

    {/* 관찰 지점 (무한스크롤 trigger) */}
    <div ref={ref} className="h-1" />
  </div>
    </div>
  );
};

export default LpDetailPage;
