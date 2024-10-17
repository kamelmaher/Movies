/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../components/types/Category";

type linkState = {
  page: number;
  content: string;
  category: Category;
  list: string;
};

const initialState: linkState = {
  page: 1,
  content: "movie",
  category: { id: -1, name: "" },
  list: "",
};

export const linkSlice = createSlice({
  name: "Link",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setCategory: (state, action: PayloadAction<Category>) => {
      state.list = "";
      state.page = 1;
      state.category = action.payload;
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.category = { id: -1, name: "" };
      state.page = 1;
      state.list = "";
      state.content = action.payload;
      localStorage.setItem("content", JSON.stringify(state.content));
    },
    setList: (state, action: PayloadAction<string>) => {
      state.list = action.payload;
      state.category = { id: -1, name: "" };
      state.page = 1;
    },
  },
});

export default linkSlice.reducer;
export const { setCategory, setContent, setList, setPage } = linkSlice.actions;
