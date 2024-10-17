/** @format */

import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import movieSlice from "./MovieSlice";
import LinkSlice from "./LinkSlice";
import categorySlice from "./CategorySlice";
import searchSlice from "./SearchSlice";

export const Store = configureStore({
  reducer: {
    Movie: movieSlice,
    Link: LinkSlice,
    Category: categorySlice,
    Search: searchSlice,
  },
});
export const useAppDispatch: () => typeof Store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof Store.getState>
> = useSelector;
