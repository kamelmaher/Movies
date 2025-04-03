/** @format */

import axios from "axios";
import { useEffect, useState } from "react";
import { MovieType } from "../types/MovieType";
import { getUrl } from "./getUrl";
export type Root = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  homepage: string;
};
export const useFetch = (url: string) => {
  const fullUrl = getUrl(url);
  const [data, setData] = useState<MovieType[]>([]);
  const [trending, setTrending] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(fullUrl)
      .then(({ data }) => {
        data.results.map((result: Root) => {
          const movie = {
            id: result.id,
            title: result.title,
            overview: result.overview,
            poster_path: result.poster_path,
            release_date: result.release_date,
            vote_average: result.vote_average,
            genre_ids: result.genre_ids,
            homepage: result.homepage,
          };
          switch (url) {
            case "trending/movie/week":
              setTrending((prev) => [...prev, movie]);
              break;
            case "discover/movie":
              setData((prev) => [...prev, movie]);
              break;
          }
        });
      })
      .catch((err) => setError(err.message));
    setIsLoading(false);
  }, [fullUrl]);

  return { data, trending, isLoading, error };
};
