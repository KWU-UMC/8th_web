import { useState } from "react";
import { LP } from "../types/lptype";
import { formatDate } from "../utils/date";
import { IoMdHeart } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authcontext";

export default function Item({ item }: { item: LP }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { isLoggedIn } = useAuth();
  const onClick = () => {
    if (isLoggedIn) {
      navigate(`/lp/${item.id}`);
    } else {
      alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
      navigate("/signin");
    }
  };

  return (
    <div
      onClick={onClick}
      className="cursor-pointer w-50 h-50 transition-transform duration-200 hover:scale-105 relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {item.thumbnail ? (
        <img
          className={`w-full h-full object-cover transition-transform group-hover:opacity-20`}
          src={item.thumbnail}
          alt={item.title}
        />
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <span>No Image</span>
        </div>
      )}
      {isHovered && (
        <div className="absolute inset-0 w-full h-full flex flex-col justify-end items-center p-4 gap-2 text-white">
          <h2 className="text-sm leading-snug">{item.title}</h2>
          <div className="w-full flex justify-around">
            <span>{formatDate(item.createdAt)}</span>
            <div className="flex gap-2 justify-center items-center">
              <IoMdHeart />
              <span>{item.likes.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
