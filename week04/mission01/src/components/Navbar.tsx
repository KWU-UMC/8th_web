import { NavLink } from "react-router-dom";

const Links = [
  { to: "/", label: "Home" },
  { to: "/movies/popular", label: "Popular" },
  { to: "/movies/upcoming", label: "Upcoming" },
  { to: "/movies/now_playing", label: "Now Playing" },
  { to: "/movies/top_rated", label: "Top Rated" },
];

export const NavBar = () => {
  return (
    <div className="flex gap-3 p-4">
      {Links.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            isActive
              ? "text-green-500 text-lg font-bold"
              : "text-gray-500 text-lg"
          }
        >
          {label}
        </NavLink>
        //NavLink는 React Router에서 제공하는 컴포넌트로, 링크를 클릭했을 때 페이지를 전환할 수 있게 해줌
        //Link와 비슷하지만, 현재 활성화된 링크를 자동으로 감지하고 스타일을 적용할 수 있는 기능이 있음
        //isActive는 현재 링크가 활성화된 상태인지 여부를 알려주는 속성
        //isActive가 true면 링크에 스타일을 적용하고, false면 다른 스타일을 적용
        //to는 링크의 경로를 지정하는 속성
        //label은 링크에 표시될 텍스트
      ))}
    </div>
  );
};
