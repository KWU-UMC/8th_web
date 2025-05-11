import { formatDistanceToNow } from "date-fns";
import type { TResponseLpList } from "../types/TLp";

type LpItem = TResponseLpList["data"]["data"][number];

interface Props {
  lp: LpItem;
}

const LpCard = ({ lp }: Props) => {
  const timeAgo = formatDistanceToNow(new Date(lp.createdAt), {
    addSuffix: true,
  });

  return (
    <div
      key={lp.id}
      className="relative aspect-square w-full overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
        <img
          src={lp.thumbnail}
          alt={`썸네일 ${lp.id}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-60 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h2 className="text-lg font-bold text-left text-white mb-2">
            {lp.title}
          </h2>
          <div className="flex justify-between items-center text-sm text-white mb-4">
            <p>{timeAgo}</p>
            <p>♥ {lp.likes.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LpCard;
