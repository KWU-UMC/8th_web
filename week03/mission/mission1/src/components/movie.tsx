import { Movie } from "../types/movie_type";

export default function MovieContainer({ movie }: { movie: Movie }) {
  const imgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  console.log(imgUrl);

  return (
    <div>
      <img className="rounded-md" src={imgUrl} />
    </div>
  );
}
