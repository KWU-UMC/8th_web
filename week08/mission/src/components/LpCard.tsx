import { formatDistanceToNow } from "date-fns";
import type { TResponseLpList } from "../types/TLp";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { forwardRef } from "react";

type LpItem = TResponseLpList["data"]["data"][number];

interface Props {
  lp: LpItem;
}

const LpCard = forwardRef<HTMLDivElement, Props>(({ lp }, ref) => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const { id, title, thumbnail, createdAt, likes } = lp;
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  const handleClick = () => {
    if (!accessToken) {
      if (window.confirm("로그인이 필요한 서비스입니다. 로그인을 해주세요!")) {
        navigate("/login");
      }
      return;
    }
    navigate(`/lp/${id}`);
  };

  return (
    <div
      ref={ref}
      className="relative aspect-square w-full overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={thumbnail}
        alt={`썸네일 ${id}`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-60 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h2 className="text-lg font-bold text-left text-white mb-2">{title}</h2>
        <div className="flex justify-between items-center text-sm text-white mb-4">
          <p>{timeAgo}</p>
          <p>♥ {likes.length}</p>
        </div>
      </div>
    </div>
  );
});

export default LpCard;
