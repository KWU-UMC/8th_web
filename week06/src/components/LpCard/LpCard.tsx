import { useNavigate } from "react-router-dom";
import { Lp } from "../../types/lp";
import { useAuth } from "../../context/AuthContext";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      <div
        onClick={() => {
          if (accessToken) {
            navigate(`/lps/${lp.id}`);
          } else {
            alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
          }
        }}
        className="relative group bg-zinc-900 rounded overflow-hidden cursor-pointer"
      >
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="w-full aspect-square object-cover hover:scale-105 hover:shadow-2xl hover:z-10 transition-all duration-200"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="font-semibold text-lg text-white  leading-tight">
            {lp.title}
          </p>
        </div>
      </div>
    </div>
  );
};
export default LpCard;
