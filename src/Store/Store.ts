import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import  movieSlice  from "./MovieSlice";
import contentSlice from "./ContentSlice";

export const Store = configureStore({
    reducer: {
        Movie: movieSlice,
        Content: contentSlice
    },
});
export const useAppDispatch: () => typeof Store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
    ReturnType<typeof Store.getState>
> = useSelector;
