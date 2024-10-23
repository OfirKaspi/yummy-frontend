import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Pagination, SearchState, Restaurant, RestaurantSearchResponse } from "@/types"
import { getRestaurants } from "@/api/restaurantsAPI"

interface RestaurantState {
    restaurants: Restaurant[]
    pagination: Pagination | null
    loading: boolean
    error: string | null
}

const initialState: RestaurantState = {
    restaurants: [],
    pagination: null,
    loading: false,
    error: null,
}

export const getRestaurantsStore = createAsyncThunk<RestaurantSearchResponse, { searchState: SearchState, city: string }>(
    'restaurants/getRestaurantsStore',
    async ({ searchState, city }: { searchState: SearchState, city: string }) => {
        const data = await getRestaurants(searchState, city)
        return data
    }
)

export const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRestaurantsStore.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getRestaurantsStore.fulfilled, (state, action) => {
                state.loading = false
                state.restaurants = action.payload.data
                state.pagination = action.payload.pagination
            })
            .addCase(getRestaurantsStore.rejected, (state) => {
                state.loading = false
                state.error = 'Failed to fetch restaurants'
            })
    },
})

export default restaurantsSlice.reducer