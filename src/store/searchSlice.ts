import { SearchState, SortOptionValue } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"

const initialState: SearchState = {
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setSelectedCuisines: (state, action: PayloadAction<string[]>) => {
            state.selectedCuisines = action.payload
        },
        setSortOption: (state, action: PayloadAction<SortOptionValue>) => {
            state.sortOption = action.payload
        },
        resetSearch: () => initialState,
    }
})

export const {
    setSearchQuery,
    setPage,
    setSelectedCuisines,
    setSortOption,
    resetSearch,
} = searchSlice.actions

export const selectSearchState = (state: RootState) => state.search
export const selectSearchQuery = (state: RootState) => state.search.searchQuery
export const selectSortOption = (state: RootState) => state.search.sortOption
export const selectSelectedCuisines = (state: RootState) => state.search.selectedCuisines

export default searchSlice.reducer