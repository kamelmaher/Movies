import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type searchState = {
    search: string
}
const initialState: searchState = {
    search: ""
}

export const searchSlice = createSlice({
    name: "Search",
    initialState,
    reducers: {
        setSearch: (state , action: PayloadAction<string>) => {
            state.search = action.payload
        }
    }
})

export default searchSlice.reducer;
export const { setSearch } = searchSlice.actions;