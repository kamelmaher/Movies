/** @format */

import { MovieType } from "../types/MovieType";
import { Root } from "../types/Root";

export const getRealData = (initial: Root): MovieType => {
  return {
    id: initial.id,
    title: initial.title,
    overview: initial.overview,
    poster_path: initial.poster_path,
    release_date: initial.release_date,
    vote_average: initial.vote_average,
    genre_ids: initial.genre_ids,
    homepage: initial.homepage,
    genres: initial.genres,
    origin_country: initial.origin_country,
    original_language: initial.original_language,
  };
};
