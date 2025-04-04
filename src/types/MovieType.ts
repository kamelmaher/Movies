/** @format */

import { Category } from "./Category";

export type MovieType = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  homepage: string;
  genres?: Category[];
  origin_country?: string[];
  original_language?: string;
};
