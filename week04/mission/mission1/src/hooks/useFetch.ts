import { useNavigate } from "react-router-dom";
import { MovieResponse } from "../types/movie_type";
import { useEffect, useState } from "react";
import { DetailI } from "../types/detail_type";
import { Credits, CreditsData } from "../types/credit_type";

interface UseMovieI {
  type: string;
  page: number;
}
export function useMovie({ type, page }: UseMovieI) {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<MovieResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageTrigger, setPageTrigger] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const url = `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=${page}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API}`,
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          navigate("/error");
          throw new Error(`API request error: ${response.status}`);
        }
        const data: MovieResponse = await response.json();
        setMovies(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [pageTrigger]);

  return { movies, isLoading, setPageTrigger };
}

interface UseDetailI {
  movieId: string;
}
export function useDetail({ movieId }: UseDetailI) {
  const navigate = useNavigate();
  const [detail, setDetail] = useState<DetailI | null>(null);
  const [detailLoading, setDetailLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDetail = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API}`,
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          navigate("/error");
          throw new Error(`API request error: ${response.status}`);
        }
        const data: DetailI = await response.json();
        setDetail(data);
        setDetailLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetail();
  }, []);

  return { detail, detailLoading };
}

interface UseCreditI {
  movieId: string;
}
export function useCredit({ movieId }: UseCreditI) {
  const navigate = useNavigate();
  const [credit, setCredit] = useState<CreditsData[] | null>(null);
  const [creditLoading, setCreditLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCredit = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API}`,
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          navigate("/error");
          throw new Error(`API request error: ${response.status}`);
        }
        const data: Credits = await response.json();
        const directors = data.crew.filter(
          (member) => member.job === "Director"
        );
        const CreditsList: CreditsData[] = [...directors, ...data.cast];
        setCredit(CreditsList);
        setCreditLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCredit();
  }, []);

  return { credit, creditLoading };
}
