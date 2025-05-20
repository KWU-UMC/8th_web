import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import { axiosInstance } from "../apis/axios";
import { getCommentsByLpId, postComment, updateComment, deleteComment } from "../apis/comments";
import { getMyInfo } from "../apis/auth";
import { postLike, postUnlike, deleteLp } from "../apis/lp";
import { LpDetail } from "../types/lp";
import { ResponseMyInfoDto } from "../types/auth";
import { FaHeart } from "react-icons/fa";
import { updateLp } from "../apis/lp";

const LpDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [commentInput, setCommentInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editInput, setEditInput] = useState("");
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editThumbnail, setEditThumbnail] = useState("");
  const [editContent, setEditContent] = useState("");
  const [isEditingLp, setIsEditingLp] = useState(false);

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

  const updateLpMutation = useMutation({
  mutationFn: ({ lpId, title, content }: { lpId: number; title: string; content: string }) =>
    updateLp(lpId, { title, content }),
  onSuccess: () => {
    setIsEditingLp(false);
    queryClient.invalidateQueries({ queryKey: ["lpDetail", id] });
  },
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

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    }, { threshold: 1.0 });

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [observerRef.current, hasNextPage]);

  const { data: myInfo } = useQuery<ResponseMyInfoDto>({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
  });

  const isLiked = lp?.likes?.some((like) => like.userId === myInfo?.data.id);

  const likeMutation = useMutation({
    mutationFn: async () => {
      if (!id) return;
      if (isLiked) {
        await postUnlike(Number(id));
      } else {
        await postLike(Number(id));
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["lpDetail", id] });

      const previous = queryClient.getQueryData(["lpDetail", id]);

      queryClient.setQueryData(["lpDetail", id], (old: any) => {
        if (!old) return old;
        const updatedLikes = isLiked
          ? old.likes.filter((like: any) => like.userId !== myInfo?.data.id)
          : [...old.likes, { userId: myInfo?.data.id }];
        return { ...old, likes: updatedLikes };
      });

      return { previous };
    },
    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["lpDetail", id], context.previous);
      }
      alert("좋아요 처리 실패");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["lpDetail", id] });
    },
  });


  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      if (!lp) return;
      await deleteLp(lp.id);
      alert("삭제되었습니다");
      navigate("/");
    } catch (err) {
      alert("삭제 실패");
      console.log(err);
    }
  };

  const commentMutation = useMutation({
    mutationFn: ({ lpId, content }: { lpId: string; content: string }) =>
      postComment(lpId, { content }),
    onSuccess: () => {
      setCommentInput("");
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
    },
  });

  const patchMutation = useMutation({
    mutationFn: ({ lpId, commentId, content }: { lpId: string; commentId: number; content: string }) =>
      updateComment(lpId, commentId, { content }),
    onSuccess: () => {
      setEditingId(null);
      setEditInput("");
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({lpId, commentId}: { lpId: string; commentId: number }) => deleteComment(lpId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
    },
  });

  if (isPending) return <div className="mt-24 text-white text-center">로딩 중...</div>;
  if (isError || !lp) return <div className="mt-24 text-red-400 text-center">LP 정보를 불러올 수 없습니다.</div>;

  const comments = commentPages?.pages.flatMap((page) => page.data) ?? [];

  return (
    <>
      <div className="max-w-6xl mx-auto mt-24 px-4 text-black">
        {/* LP 상세 내용 */}
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={lp.thumbnail || undefined}
              alt={lp.title}
              className="w-full max-w-sm aspect-square object-cover rounded-xl"
            />
          </div>
          <div className="w-full md:w-1/2">
            {isEditingLp ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full border rounded p-2 mb-2"
                  placeholder="제목"
                />
                <input
                  type="text"
                  value={editThumbnail}
                  onChange={(e) => setEditThumbnail(e.target.value)}
                  className="w-full border rounded p-2 mb-2"
                  placeholder="썸네일 이미지 URL"
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full border rounded p-2 mb-4 h-40"
                  placeholder="내용"
                />
                <div className="flex gap-2 mb-6">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => updateLpMutation.mutate({
                      lpId: lp.id,
                      title: editTitle,
                      content: editContent,
                      thumbnail: editThumbnail,
                    })}
                  >저장</button>
                  <button
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={() => setIsEditingLp(false)}
                  >취소</button>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold mb-2">{lp.title}</h1>
                <p className="text-sm">작성자: {lp.author.name}</p>
                <p className="text-sm mb-4">업로드 날짜: {new Date(lp.createdAt).toLocaleDateString()}</p>
                <p className="mb-6">{lp.content}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {lp.tags.map((tag) => (
                    <span key={tag.id} className="bg-gray-200 px-2 py-1 rounded text-xs">
                      # {tag.name}
                    </span>
                  ))}
                </div>
              </>
            )}

            <div className="flex space-x-4">
              {myInfo?.data.id === lp.author.id && !isEditingLp && (
                <>
                  <button
                    onClick={() => {
                      setEditTitle(lp.title);
                      setEditContent(lp.content);
                      setEditThumbnail(lp.thumbnail);
                      setIsEditingLp(true);
                    }}
                    className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >수정</button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >삭제</button>
                </>
              )}
              <button
                onClick={() => likeMutation.mutate()}
                className="px-4 py-2 rounded flex border-2 border-gray-300 items-center gap-2"
              >
                <FaHeart color={isLiked ? "red" : "gray"} />
                {lp.likes.length}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 댓글 영역 */}
      <div className="mx-10 mt-10">
        <hr className="my-12 border-t border-gray-300" />
        <h2 className="text-xl font-semibold mb-4">댓글</h2>

        <div className="mb-6 flex items-start gap-2">
          <textarea
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className="flex-1 border p-2 rounded text-sm h-20 resize-none"
            placeholder="댓글을 입력하세요"
          />
          <button
            onClick={() => commentMutation.mutate({ lpId: id!, content: commentInput })}
            disabled={commentMutation.isPending || !commentInput.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 h-20 w-20"
          >
            {commentMutation.isPending ? "작성 중..." : "작성"}
          </button>
        </div>

        <ul className="space-y-4">
          {comments.map((comment) => {
            const isMine = comment.author.id === myInfo?.data.id;
            const isEditing = editingId === comment.id;
            const isMenuOpen = menuOpenId === comment.id;

            return (
              <li key={comment.id} className="p-4 border border-gray-200 rounded-md relative">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{comment.author.name} ・ {new Date(comment.createdAt).toLocaleDateString()}</span>
                  {isMine && (
                    <button onClick={() => setMenuOpenId(isMenuOpen ? null : comment.id)}>⋯</button>
                  )}
                </div>

                {isEditing ? (
                  <>
                    <textarea
                      value={editInput}
                      onChange={(e) => setEditInput(e.target.value)}
                      className="w-full border p-2 rounded text-sm mt-2"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                        onClick={() => patchMutation.mutate({ lpId:String(lp.id), commentId:comment.id, content:editInput })}
                      >저장</button>
                      <button
                        className="px-3 py-1 text-sm bg-gray-300 rounded"
                        onClick={() => setEditingId(null)}
                      >취소</button>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-700 mt-2">{comment.content}</p>
                )}

                {isMenuOpen && !isEditing && (
                  <div className="absolute right-4 top-6 bg-white border px-2 py-1 rounded shadow text-sm z-10">
                    <button
                      onClick={() => {
                        setEditingId(comment.id);
                        setEditInput(comment.content);
                        setMenuOpenId(null);
                      }}
                      className="block px-2 py-1 hover:bg-gray-100 w-full text-left"
                    >수정</button>
                    <button
                      onClick={() => {
                        if (window.confirm("정말 삭제하시겠습니까?")) {
                          deleteMutation.mutate({ lpId:String(lp.id), commentId:comment.id });
                        }
                      }}
                      className="block px-2 py-1 hover:bg-gray-100 w-full text-left text-red-500"
                    >삭제</button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div ref={observerRef} className="h-10"></div>
        {isFetchingNextPage && <p className="text-gray-500">댓글 더 불러오는 중...</p>}
      </div>
    </>
  );
};

export default LpDetailPage;
