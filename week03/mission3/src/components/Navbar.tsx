import { Link, useLocation } from 'react-router-dom';
import { TbuttonProps } from '../types/button';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="flex justify-between items-center p-3">
      <div className="flex gap-4 p-3">
        <Button to="/" variant="home">홈</Button>
        <Button to="/movies/popular" variant="popular">인기 영화</Button>
        <Button to="/movies/now_playing" variant="now_playing">상영 중</Button>
        <Button to="/movies/top_rated" variant="top-rated">평점 높은</Button>
        <Button to="/movies/upcoming" variant="upcoming">개봉 예정</Button>
      </div>
    </nav>
  );
};
  
const Button = ({ to, variant, children }: TbuttonProps) => {
  const location = useLocation();

  const baseStyles = 'px-2.5 py-0.5 text-center transition-all duration-200 hover:text-lime-200 w-auto';
  let buttonStyles;

  // 경로 일치 or 호버 시 색상
  if (location.pathname === to) {
    buttonStyles = 'text-lime-200'; 
  } else {
    buttonStyles = 'text-white'; 
  }

  return (
    <Link to={to} className={`${baseStyles} ${buttonStyles}  text-xl`}>
      {children}
    </Link>
  );
};

export default Navbar;