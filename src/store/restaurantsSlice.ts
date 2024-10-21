import { SearchState } from "@/types"
import axios from 'axios'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Restaurant, RestaurantSearchResponse } from '@/types'
import { RootState } from '@/store/store'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

interface RestaurantState {
    restaurants: Restaurant[]
    loading: boolean
    error: string | null
}

const initialState: RestaurantState = {
    restaurants: [],
    loading: false,
    error: null,
}

export const fetchRestaurants = createAsyncThunk<RestaurantSearchResponse, { searchState: SearchState, city: string }>(
    'restaurants/fetchRestaurants',
    async ({ searchState, city }: { searchState: SearchState, city: string }) => {
        const params = new URLSearchParams()
        params.set("searchQuery", searchState.searchQuery)
        params.set("page", searchState.page.toString())
        params.set("selectedCuisines", searchState.selectedCuisines.join(","))
        params.set("sortOption", searchState.sortOption)

        const response = await axios.get(`${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`)
        return response.data
    }
)

export const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRestaurants.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchRestaurants.fulfilled, (state, action) => {
                state.loading = false
                state.restaurants = action.payload.data
            })
            .addCase(fetchRestaurants.rejected, (state) => {
                state.loading = false
                state.error = 'Failed to fetch restaurants'
            })
    },
})

export const selectRestaurants = (state: RootState) => state.restaurants.restaurants
export const selectLoading = (state: RootState) => state.restaurants.loading
export const selectError = (state: RootState) => state.restaurants.error

export default restaurantsSlice.reducer