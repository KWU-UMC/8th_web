import { useState } from "react";
import {TmovieInfo} from "../types/movieInfo";

const MovieCard = ({ id, image, title, overview }: TmovieInfo) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <div
          className="relative w-[calc(100%/10-20px)] aspect-[2/3] overflow-hidden mt-10 ml-4.5"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={`https://image.tmdb.org/t/p/original/${image}`}
            alt={title}
            className="w-full h-full object-cover rounded-[7px] transition-transform duration-200"
          />
          <div
            className={`absolute inset-0 flex flex-col justify-end items-start text-white p-[10px] rounded-[7px] transition-opacity duration-200 
            ${isHovered ? 'opacity-100 bg-[rgba(0,0,0,0.8)] backdrop-blur-sm' : 'opacity-0'}`}
          >
            <h3 className="m-0 text-[15px] overflow-hidden text-ellipsis text-left">
              {title}
            </h3>
            <p className="mt-[5px] text-[10px] text-left line-clamp-3 overflow-hidden text-ellipsis">
              {overview}
            </p>
          </div>
        </div>
      );
};
    
export default MovieCard;