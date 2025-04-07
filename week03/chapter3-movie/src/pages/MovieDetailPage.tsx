import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MovieDetail, Credits } from "../types/movieDetail"; // 타입은 분리된 파일에서 가져온다고 가정

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      setIsPending(true);
      try {
        const [detailRes, creditsRes] = await Promise.all([
          axios.get<MovieDetail>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          ),
          axios.get<Credits>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          ),
        ]);

        setMovieDetail(detailRes.data);
        setCredits(creditsRes.data);
      } catch (error) {
        console.error("데이터 요청 실패", error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    if (movieId) fetchMovieData();
  }, [movieId]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-gray-500 text-xl">로딩 중...</span>
      </div>
    );
  }

  if (isError || !movieDetail) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
    <div className="p-10">
      {/* 배경 이미지 */}
      <div
        className="relative w-full h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movieDetail.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">{movieDetail.title}</h1>
        </div>
      </div>

      {/* 영화 요약 정보 */}
      <div className="mt-10 flex flex-col lg:flex-row gap-10">
        <img
          className="w-64 rounded-lg shadow-lg"
          src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
          alt={movieDetail.title}
        />

        <div>
          <p className="text-gray-700 text-lg">{movieDetail.overview}</p>
          <p className="text-gray-500 mt-4">
            <strong>개봉일:</strong> {movieDetail.release_date}
          </p>
          <p className="text-gray-500">
            <strong>평점:</strong> {movieDetail.vote_average} / 10
          </p>
          <div className="mt-4">
            <strong>장르:</strong>
            <div className="flex flex-wrap mt-2">
              {movieDetail.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-200 text-gray-800 text-sm font-semibold mr-2 px-4 py-2 rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 감독 및 출연진 */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">감독 / 출연</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {/* 감독 */}
          {credits?.crew
            .filter((member) => member.job === "Director")
            .map((crew) => (
              <div key={crew.credit_id} className="text-center">
                <p className="font-semibold">{crew.name}</p>
                <p className="text-sm text-gray-500">{crew.job}</p>
              </div>
            ))}

          {/* 출연진 */}
          {credits?.cast.slice(0, 12).map((cast) => (
            <div key={cast.cast_id} className="text-center">
              <img
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
                    : "https://via.placeholder.com/185x278?text=No+Image"
                }
                alt={cast.name}
                className="w-full h-auto rounded-lg shadow"
              />
              <p className="font-semibold mt-2">{cast.name}</p>
              <p className="text-sm text-gray-500">{cast.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
