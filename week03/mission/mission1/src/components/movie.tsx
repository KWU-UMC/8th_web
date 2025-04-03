import { Movie } from "../types/movie_type";

export default function MovieContainer({ movie }: { movie: Movie }) {
  const imgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  return (
    <>
      <div className="transition transform hover:scale-105 relative group">
        <img
          className="rounded-md group-hover:opacity-10 transition duration-100"
          src={imgUrl}
        />
        <div className="absolute inset-0 p-4 opacity-0 pointer-events-none group-hover:opacity-100 flex flex-col justify-center items-center">
          <h3 className="text-base font-bold leading-tight text-center">
            {movie.title}
          </h3>
          <p className="text-sm text-gray-300 line-clamp-5 leading-tight mt-2 text-center">
            {movie.overview}
          </p>
        </div>
      </div>
    </>
  );
}
