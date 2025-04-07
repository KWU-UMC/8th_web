import { useState } from "react"; // 컴포넌트 안에서 상태 관리할 수 있게 해주는 훅
import { Movie } from "../types/movie"; // 우리가 정의한 영화 타입 가져옴
import { useNavigate } from "react-router-dom";

// 컴포넌트에 전달될 props의 타입 정의
interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  // 마우스를 올렸는지 여부를 저장하는 상태 (true: 올림, false: 안 올림)
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

  return (
    // 영화 카드 하나를 감싸는 div - hover 시 커지는 애니메이션 효과 포함
    <div
      onClick={() => navigate(`/movie/${movie.id}`)} // 클릭 시 상세 페이지로 이동
      className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer w-44 transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)} // 마우스를 올리면 상태 true
      onMouseLeave={() => setIsHovered(false)} // 마우스 내리면 상태 false
    >
      {/* 포스터 이미지 출력. TMDB에서 제공하는 이미지 URL 구조에 맞게 경로 조합 */}
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={`${movie.title}`} // 접근성 고려: 이미지 대체 텍스트에 영화 제목 사용
      />

      {/* 마우스를 올렸을 때만 정보 오버레이 보여줌 */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-md text-white flex flex-col justify-center items-center p-4">
          <h2 className="text-lg font-bold  leading-snug">{movie.title}</h2>
          <p className="text-sm text-gray-300 leading-relaxed mt-2 line-clamp-5">
            {movie.overview} {/* 영화 설명 출력. 길어지면 최대 5줄로 제한 */}
          </p>
        </div>
      )}
    </div>
  );
}
