/** @format */

import { Category } from "../types/Category";

export const getCategories = (ids: number[], allCategories: Category[]) => {
  const categories: Category[] = [];
  allCategories.map((category) => {
    ids.map((id) => {
      if (category.id == id) categories.push(category);
    });
  });
  return categories;
};
