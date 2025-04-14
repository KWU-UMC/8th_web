import { NavLink } from 'react-router-dom';
import { TbuttonProps } from '../types/button';

const Navbar = () => {
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
  const baseStyles = 'px-2.5 py-0.5 text-center transition-all duration-200 hover:text-lime-200 w-auto text-xl';

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${baseStyles} ${isActive ? 'text-lime-200' : 'text-white'}`
      }
    >
      {children}
    </NavLink>
  );
};

export default Navbar;