import { Lp } from "../../types/lp";
import { formatDistanceToNow } from "date-fns";
import { FaHeart } from "react-icons/fa";

type Props = {
  lp: Lp;
};

const LpCard = ({ lp }: Props) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105 group">
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full h-64 object-cover"
      />
      {/* Hover 시 오버레이 */}
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-70 flex flex-col justify-end p-4 transition-opacity duration-300 text-white">
        <h2 className="font-semibold">{lp.title}</h2>
        <p className="text-sm">
          {formatDistanceToNow(new Date(lp.createdAt))} ago
        </p>
        <div className="flex items-center gap-1">
          <FaHeart className="text-red-500" />
          <span>{lp.likes.length}</span>
        </div>
      </div>
    </div>
  );
};

export default LpCard;
