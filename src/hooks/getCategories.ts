/** @format */

import { Category } from "../types/Category";

export const getCategories = (ids: number[], allCategories: Category[]) => {
  const myCategories: Category[] = [];
  ids.map((id) => {
    const category = allCategories.find((e) => e.id == id)!;
    myCategories.push(category);
  });
  return myCategories;
};
