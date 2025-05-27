import { useNavigate } from "react-router-dom";
import {Lp} from "../../types/lp.ts";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "../../context/AuthContext";


interface LpCardProps{
    lp:Lp
}


const LpCard = ({lp}: LpCardProps) => {
    const navigate = useNavigate();
    const { accessToken } = useAuth();

    const handleClick = () => {
    if (!accessToken) {
        const confirmed = window.confirm("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
        if (confirmed) {
            navigate("/login");
        }
        return;
    }

    navigate(`/lps/${lp.id}`);
    };

    
    return(
        <div className="group relative rounded-lg overflow-hidden shadow-lg 
        hover:shadow-2xl transition-shadow duration-300
        hover:scale-110" onClick={handleClick}>
            <div className="absolute inset-0 bg-black/60 bg-opacity-75 opacity-0
            group-hover:opacity-100 transition-opacity duration-300 flex flex-col 
            justify-end p-2">
                <h3 className="right-0 text-white text-sm font-semibold mb-2">{lp.title}</h3>
                <div className="text-white text-xs flex justify-between items-center">
                    <span> {formatDistanceToNow(new Date(lp.createdAt))}
                    </span>
                    <span> ♥️ {lp.likes.length} </span>
                </div>
            </div>
            <img src={lp.thumbnail} alt={lp.title} 
            className="object-cover w-full h-48 transition-transform duration-300"/>
        </div>
    );
};

export default LpCard;