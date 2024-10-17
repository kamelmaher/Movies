import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Category } from "../components/types/Category"

type CategoryState = {
    categories: Category[]
}
const initialState: CategoryState = {
    categories: []
}

export const categorySlice = createSlice({
    name: "Category",
    initialState,
    reducers: {
        setCategories: (state , action: PayloadAction<Category[]>) => {
            state.categories = action.payload
        }
    }
})


export default categorySlice.reducer;
export const { setCategories } = categorySlice.actions;