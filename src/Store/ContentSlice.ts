import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type ContentState = {
    content: string
}

const initialState: ContentState = {
    content: "movie"
}

export const contentSlice = createSlice({
    name: "Content",
    initialState,
    reducers: {
        changeContent: (state , action: PayloadAction<string>) => {
            state.content = action.payload
        }
    }
})

export default contentSlice.reducer;
export const { changeContent } = contentSlice.actions;
