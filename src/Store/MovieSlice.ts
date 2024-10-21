/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../components/types/Category";

export type Movie = {
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  homepage: string;
  popularity: number
  // For Series
  name: string;
  genres: Category[];
  origin_country: string[];
  first_air_date: string;
  seasons: Season[];
};

export type Season = {
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
  episodes: Epsoides[];
};

export type Epsoides = {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
};
type MovieState = {
  movies: Movie[];
  activeCategory: number;
};
const initialState: MovieState = {
  movies: [],
  activeCategory: -1,
};
export const movieSlice = createSlice({
  name: "MovieSlice",
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<number>) => {
      state.activeCategory = action.payload;
    },
  },
});

export default movieSlice.reducer;
export const { changeCategory } = movieSlice.actions;
