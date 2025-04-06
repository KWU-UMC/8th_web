import { Movie } from "../types/movie"

interface MovieCardProps{
    moive:Movie
}

export default function MovieCard({ moive }: MovieCardProps){
    return (
        <div>
            <img src={`https://image.tmdb.org/t/p/w300${moive.poster_path}`}/>
        </div>
    )
}