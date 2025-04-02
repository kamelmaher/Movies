/** @format */

import axios from "axios";
import { useEffect, useState } from "react";
import { MovieType } from "../types/MovieType";
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
  const [data, setData] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios.get(url).then(({ data }) => {
      data.results.map((result: Root) =>
        setData((prev) => [
          ...prev,
          {
            id: result.id,
            title: result.title,
            overview: result.overview,
            poster_path: result.poster_path,
            release_date: result.release_date,
            vote_average: result.vote_average,
            genre_ids: result.genre_ids,
            homepage: result.homepage,
          },
        ])
      );
    });
    setIsLoading(false);
  }, [url]);

  return { data, isLoading };
};
