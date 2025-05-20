import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useGetLpDetail } from "../hooks/queries/useGetLpDetail";
import { Heart, Pencil, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { patchLpDetail, deleteLpDetail } from "../apis/lp";
import type { TResponseLpDetail } from "../types/TLp";
import { postLike, postUnlike } from "../apis/lp";

const LpDetailPage = () => {
  const navigate = useNavigate();
  const { LPid } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newThumbnail, setNewThumbnail] = useState<string>("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data, error, isLoading } = useGetLpDetail(LPid!);
  const likeMutation = useMutation({
    mutationFn: () => postLike(Number(LPid)),
    onSuccess: () => {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    },
  });
  const unlikeMutation = useMutation({
    mutationFn: () => postUnlike(Number(LPid)),
    onSuccess: () => {
      setIsLiked(false);
      setLikeCount((prev) => Math.max(0, prev - 1));
    },
  });
  const patchMutation = useMutation({
    mutationFn: (updatedData: Partial<TResponseLpDetail>) =>
      patchLpDetail(LPid!, updatedData),
    onError: (error) => {
      console.error(error);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: () => deleteLpDetail(LPid!),
    onSuccess: () => {
      alert("삭제 성공");
      navigate(-1);
    },
    onError: () => {
      alert("삭제 실패");
    },
  });

  useEffect(() => {
    if (data?.data.data) {
      const lpDetail = data.data.data;
      setNewTitle(lpDetail.title);
      setNewContent(lpDetail.content);
      setNewThumbnail(lpDetail.thumbnail);
      setLikeCount(lpDetail.likes.length);
      const userId = Number(localStorage.getItem("userId"));
      const likedByUser = lpDetail.likes.some((like) => like.userId === userId);

      setIsLiked(likedByUser);
      setLikeCount(lpDetail.likes.length);
    }
  }, [data]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;

  const lpDetail = data?.data.data;
  if (!lpDetail) {
    return <div>상세 정보 없음</div>;
  }

  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThumbnailClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleSaveChanges = () => {
    patchMutation.mutate({
      title: newTitle,
      content: newContent,
      thumbnail: newThumbnail,
    });
    setIsEditing(false);
  };
  const handleLikeClick = () => {
    if (isLiked) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

  return (
    <div className="text-white flex justify-center p-6">
      <div className="bg-[#1E1E1E] rounded-2xl p-6 max-w-2xl w-full shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-5">
            <img
              src={lpDetail.author.avatar ?? "/default-avatar.png"}
              alt="작성자"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-lg font-semibold">
              {lpDetail.author.name}
            </span>
            <span className="text-sm text-white">
              {formatDistanceToNow(new Date(lpDetail.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          {isEditing ? (
            <div className="flex flex-col gap-4 w-full">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="p-2 bg-[#2C2C2C] text-white rounded"
                placeholder="제목을 입력하세요"
              />
            </div>
          ) : (
            <div className="flex justify-between items-center w-full">
              <h1 className="text-2xl font-bold">{lpDetail.title}</h1>
              <div className="flex gap-4">
                <button
                  className="text-gray-400 hover:text-white"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  className="text-gray-400 hover:text-white"
                  onClick={() => {
                    const confirmDelete = confirm("정말 삭제하시겠습니까?");
                    if (confirmDelete) {
                      deleteMutation.mutate();
                    }
                  }}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center mb-6">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleThumbnailChange}
            className="hidden"
          />
          <div
            className="relative animate-spin-slow cursor-pointer"
            onClick={handleThumbnailClick}
            title={isEditing ? "클릭하여 썸네일 변경" : ""}
          >
            <img
              src={newThumbnail || lpDetail.thumbnail}
              alt="썸네일"
              className="w-80 h-80 rounded-full shadow-md object-cover"
            />
            <div className="cd-hole"></div>
          </div>
          <style>{`
          .animate-spin-slow {
            animation: spin 10s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          .cd-image {
            position: relative;
          }

          .cd-hole {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 25%; 
            height: 25%;
            background-color: white;
            border-radius: 50%;
            transform: translate(-50%, -50%);
          }
        `}</style>
        </div>

        {isEditing ? (
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="p-2 bg-[#2C2C2C] text-white rounded w-full mb-4"
            placeholder="내용을 입력하세요"
            rows={5}
          />
        ) : (
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            {newContent || lpDetail.content}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {lpDetail.tags && lpDetail.tags.length > 0 ? (
            lpDetail.tags.map((tag) => (
              <span
                key={tag.id}
                className="bg-[#2C2C2C] px-3 py-1 rounded-full text-sm text-white"
              >
                #{tag.name}
              </span>
            ))
          ) : (
            <span className="bg-[#2C2C2C] px-3 py-1 rounded-full text-sm text-white">
              # No tags
            </span>
          )}
        </div>

        {isEditing && (
          <div className="flex justify-end mb-4">
            <button
              onClick={handleSaveChanges}
              className="bg-[#E91E63] text-white px-4 py-2 rounded hover:opacity-70"
            >
              저장
            </button>
          </div>
        )}

        <div
          className="flex items-center justify-center gap-1 cursor-pointer"
          onClick={handleLikeClick}
          role="button"
          aria-label={isLiked ? "좋아요 취소" : "좋아요"}
        >
          <Heart
            className={`w-5 h-5 transition-all ${
              isLiked ? "text-pink-500 fill-pink-500" : "text-gray-400"
            }`}
          />
          <span className="text-sm">{likeCount}</span>
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;
