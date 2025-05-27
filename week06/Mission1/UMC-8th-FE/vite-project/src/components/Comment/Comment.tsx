import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Comment as CommentType } from "../../types/comment";

interface CommentProps {
  cms: CommentType;
}

const Comment = ({ cms }: CommentProps) => {
    const navigate = useNavigate();
    const { accessToken } = useAuth();

    const handleClick = () => {
        if (!accessToken) {
            alert("로그인이 필요합니다.");
            navigate("/login");
        }
    };

    return (
        <div className="flex gap-3 items-start p-2 border-b border-gray-700"
            onClick={handleClick}>
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
            <p className="text-sm text-gray-200">{cms.content}</p>
        </div>
    </div>
    );
};

export default Comment;
