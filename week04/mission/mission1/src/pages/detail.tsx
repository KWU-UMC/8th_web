import { useParams } from "react-router-dom";
import Loadindicator from "../components/loadindicator";
import Actor from "../components/actor";
import { useCredit, useDetail } from "../hooks/useFetch";

export default function Detail() {
  const params = useParams();

  const { detail, detailLoading } = useDetail({
    movieId: params.movieId as string,
  });

  const { credit, creditLoading } = useCredit({
    movieId: params.movieId as string,
  });

  if (detailLoading || creditLoading) return <Loadindicator />;

  return (
    <div className="w-full h-screen">
      <div className="relative w-full h-100 mt-[56px]">
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${detail?.poster_path}`}
        />
        <div className="absolute inset-0 p-10 flex flex-col justify-between w-[70%] bg-gradient-to-r from-black/90 via-black/30 to-transparent">
          <h2 className="text-6xl font-bold">{detail?.title}</h2>
          <div>
            <h3 className="text-xl">{`⭐️ ${detail?.vote_average}`}</h3>
            <h3 className="text-xl">{detail?.release_date}</h3>
            <h3 className="text-xl">{detail?.runtime}</h3>
          </div>
          <h3 className="text-2xl">{detail?.tagline}</h3>
          <p className="w-[70%] line-clamp-6">{detail?.overview}</p>
        </div>
      </div>
      <div className="w-full h-auto px-10 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-5 place-items-center">
          {credit?.map((crew, index) => (
            <Actor key={index} credit={crew} />
          ))}
        </div>
      </div>
    </div>
  );
}
