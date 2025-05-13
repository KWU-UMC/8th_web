import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  create_comment,
  delete_comment,
  lpComments,
  modify_comment,
} from "../apis/lpapi";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/authcontext";
import { Comment } from "../types/lptype";
import { GoKebabHorizontal } from "react-icons/go";
import { LuPencil } from "react-icons/lu";
import { FaTrashAlt } from "react-icons/fa";

export default function Comments() {
  const [isASC, setIsASC] = useState<boolean>(true);
  const [content, setContent] = useState<string>("");
  const params = useParams();
  const [data, setData] = useState<Comment[]>([]);
  const { accessToken, data: userData } = useAuth();
  const queryClient = useQueryClient();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [modifyCommentId, setModifyCommentId] = useState<number | null>(null);
  const [modifyContent, setModifyContent] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const { mutate: createMutate } = useMutation({
    mutationFn: () =>
      create_comment({ lpId: params.lpID as string, content, accessToken }),
    onSuccess: () => {
      setContent("");
      queryClient.invalidateQueries({
        queryKey: ["comments", isASC, params.lpID],
      });
    },
    onError: () => console.log("mutate Error"),
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() !== "") {
      createMutate();
    }
  };
  const { mutate: deleteMutate } = useMutation({
    mutationFn: delete_comment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", isASC, params.lpID],
      });
    },
  });
  const handleDelete = ({ commentId }: { commentId: number }) => {
    deleteMutate({ lpId: params.lpID as string, commentId, accessToken });
  };
  const { mutate: modifyMutate } = useMutation({
    mutationFn: modify_comment,
    onSuccess: () => {
      setModifyCommentId(null);
      queryClient.invalidateQueries({
        queryKey: ["comments", isASC, params.lpID],
      });
    },
  });
  const handleModifySubmit = (e: React.FormEvent, commentId: number) => {
    e.preventDefault();
    if (modifyContent.trim() !== "") {
      modifyMutate({
        lpId: params.lpID as string,
        commentId,
        content: modifyContent,
        accessToken,
      });
    }
  };
  const handleModifyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModifyContent(e.target.value);
  };

  const {
    data: infiniteData,
    fetchNextPage,
    isLoading,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", isASC, params.lpID],
    queryFn: ({ pageParam = 0 }) =>
      lpComments({
        id: params.lpID as string,
        cursor: pageParam,
        order: isASC ? "asc" : "desc",
        accessToken,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage?.hasNext ? lastPage.nextCursor : undefined;
    },
  });

  useEffect(() => {
    const merged = infiniteData?.pages.flatMap(
      (page) => page?.data
    ) as Comment[];
    setData(merged);
  }, [infiniteData]);

  const observer = useRef<IntersectionObserver | null>(null);
  const setObserverRef = useCallback((node: HTMLDivElement | null) => {
    if (observer.current) observer.current.disconnect();

    if (node) {
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchNextPage();
          }
        },
        {
          root: null,
          rootMargin: "100px",
          threshold: 0,
        }
      );
      observer.current.observe(node);
    }
  }, []);

  if (isLoading) return null;

  return (
    <div className="w-4/5 h-auto bg-gray-500 flex flex-col gap-6 px-10 py-10 text-white rounded-2xl">
      <div className="flex justify-between items-center">
        <span className="font-bold text-xl">댓글</span>
        <div className="flex justify-end">
          <button
            onClick={() => setIsASC(true)}
            className={`flex justify-center items-center rounded-l-lg w-25 h-5 p-4 ${
              isASC ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            오래된순
          </button>
          <button
            onClick={() => setIsASC(false)}
            className={`flex justify-center items-center rounded-r-lg w-20 h-5 p-4 ${
              isASC ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            최신순
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="w-full flex gap-4">
        <input
          onChange={handleChange}
          className="flex-10 p-2 border-1 rounded-md"
          placeholder="댓글을 입력해주세요"
          value={content}
        />
        <button className="flex-1 bg-gray-400 rounded-xl" type="submit">
          작성
        </button>
      </form>
      <div className="flex flex-col gap-4">
        {data?.map((comment, index) => (
          <div
            key={index}
            className="flex justify-between items-center relative"
          >
            <div className="flex gap-4 justify-start items-center">
              <div>
                {comment?.author.avatar ? (
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src={comment?.author.avatar as string}
                    alt="avatar"
                  />
                ) : (
                  <div className="w-10 flex justify-center items-center">
                    <span>No Image</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span>{comment?.author.name}</span>
                {modifyCommentId == comment.id ? (
                  <form onSubmit={(e) => handleModifySubmit(e, comment.id)}>
                    <input
                      onChange={handleModifyChange}
                      value={modifyContent}
                      className="w-full border-1 border-white rounded-sm"
                    />
                  </form>
                ) : (
                  <span>{comment?.content}</span>
                )}
              </div>
            </div>
            {comment.authorId == userData?.id ? (
              <GoKebabHorizontal
                className="cursor-pointer"
                onClick={() =>
                  setOpenMenuId((prev) =>
                    prev === comment.id ? null : comment.id
                  )
                }
              />
            ) : null}
            {comment.authorId === userData?.id && openMenuId === comment.id && (
              <div className="absolute -right-0.5 -bottom-4 flex gap-3 bg-black p-2 rounded-xl cursor-pointer">
                <LuPencil
                  onClick={() =>
                    setModifyCommentId((prev) =>
                      prev === comment.id ? null : comment.id
                    )
                  }
                />
                <FaTrashAlt
                  onClick={() => handleDelete({ commentId: comment.id })}
                />
              </div>
            )}
          </div>
        ))}
        {hasNextPage &&
          Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="flex gap-4 justify-start items-center animate-pulse"
            >
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              <div className="flex flex-col gap-2">
                <div className="w-20 h-4 rounded-2xl bg-gray-300"></div>
                <div className="w-100 h-4 rounded-2xl bg-gray-300"></div>
              </div>
            </div>
          ))}
      </div>
      <div ref={setObserverRef} className="w-full h-2 bg-transparent" />
    </div>
  );
}
