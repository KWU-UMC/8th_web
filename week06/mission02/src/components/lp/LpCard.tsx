import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { FaHeart } from "react-icons/fa";
import { Lp } from "../../types/lp";
import { useAuth } from "../../context/AuthContext";
import AlertModal from "../common/AlertModal";

type Props = {
  lp: Lp;
};

const LpCard = ({ lp }: Props) => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (accessToken) {
      navigate(`/lp/${lp.id}`);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105 group cursor-pointer"
      >
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="w-full h-64 object-cover"
        />
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

      <AlertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
        message="로그인이 필요한 기능입니다. 로그인 페이지로 이동할까요?"
      />
    </>
  );
};

export default LpCard;
