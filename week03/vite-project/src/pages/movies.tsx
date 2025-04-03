import { useParams } from "react-router-dom";

//movies.tsx
const MoviePage = ()=>{
    const params = useParams();

    console.log(params);

    return(
        <div>
            <h1> 🎬Movies Page🎬 </h1>
            <p> {params.movieId} 번의 Movies Page 입니다! </p>
        </div>
    );
}

export default MoviePage;