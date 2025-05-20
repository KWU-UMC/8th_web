import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Comment as CommentType } from "../../types/comment";
import { useQueryClient } from "@tanstack/react-query";

interface CommentProps {
  cms: CommentType;
  lpId: number;
}

const Comment = ({ cms, lpId }: CommentProps) => {
    const navigate = useNavigate();
    const { accessToken, user } = useAuth();
    const queryClient = useQueryClient();
    
    const [showMenu, setShowMenu] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(cms.content);

    const deleteMutation = useDeleteComment(lpId, cms.id);
    const updateMutation = useUpdateComment(lpId, cms.id);
    
    const handleClick = () => {
        if (!accessToken) {
            alert("로그인이 필요합니다.");
            navigate("/login");
        }
    };

    const handleDelete = () => {
    deleteMutation.mutate(undefined, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
        },
    });
    };

    const handleUpdate = () => {
        if (!editContent.trim()) return;
        updateMutation.mutate(
            { content: editContent.trim() },
            {
                onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
                setIsEditing(false);
                },
            }
        );
    };

    return (
    <div className="flex gap-3 items-start p-2 border-b border-gray-700 relative">
      <div className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
        {cms.author.name[0]}
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <span className="text-sm font-medium text-white">{cms.author.name}</span>
          <span className="text-xs text-gray-400">
            {new Date(cms.createdAt).toLocaleDateString("ko-KR")}
          </span>
        </div>

        {isEditing ? (
          <div className="flex gap-2 mt-1">
            <input
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="flex-1 p-1 text-sm bg-[#333] text-white rounded"
            />
            <button onClick={handleUpdate} className="text-sm text-green-400 hover:underline">
              저장
            </button>
            <button onClick={() => setIsEditing(false)} className="text-sm text-gray-400 hover:underline">
              취소
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-200 mt-1">{cms.content}</p>
        )}
      </div>

      {/* 옵션 버튼 (본인만 보임) */}
      {user?.id === cms.author.id && (
        <div className="relative">
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-white hover:text-gray-400 px-2"
          >
            ⋮
          </button>
          {showMenu && (
            <div className="absolute right-0 top-6 bg-[#333] border border-gray-600 rounded shadow-md z-50">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setShowMenu(false);
                }}
                className="block px-4 py-1 text-sm text-white hover:bg-gray-700 w-full text-left"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                className="block px-4 py-1 text-sm text-red-400 hover:bg-gray-700 w-full text-left"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;
