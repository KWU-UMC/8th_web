import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const paths = [
    { path: "/", label: "홈" },
    { path: "/popular", label: "인기영화" },
    { path: "/nowplaying", label: "상영 중" },
    { path: "/toprated", label: "평점 높은" },
    { path: "/upcoming", label: "개봉 예정" },
  ];

  const handleNavClick = (page: string) => {
    navigate(page);
  };

  return (
    <div className="w-full bg-gray-500 fixed top-0 z-30 flex gap-4 px-4">
      {paths.map((path, idx) => (
        <button
          key={idx}
          onClick={() => handleNavClick(path.path)}
          className={`bg-gray-500 cursor-pointer p-4 ${
            currentPath === path.path ? "text-blue-500" : "text-white"
          }`}
        >
          {path.label}
        </button>
      ))}
    </div>
  );
}
