import { Link } from "react-router-dom";

export const Navbar=() => {
    return (
        <div className="flex gap-3 p-4"> 
            <Link to='/'> 홈 </Link> 
            <Link to='movies/popular'> 인기 영화</Link>
            <Link to='movies/now_playing'> 상영 중</Link>
        </div>
    );
}