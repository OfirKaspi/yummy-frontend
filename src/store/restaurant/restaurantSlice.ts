import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Restaurant } from '@/types'
import { getRestaurantById } from '@/api/restaurantAPI'

interface RestaurantState {
    restaurant: Restaurant | null
    loading: boolean
    error: string | null
}

const initialState: RestaurantState = {
    restaurant: null,
    loading: false,
    error: null,
}

export const getRestaurantByIdStore = createAsyncThunk<Restaurant, string>(
    'restaurant/getRestaurantByIdStore',
    async (restaurantId: string) => {
        return await getRestaurantById(restaurantId)
    }
)

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRestaurantByIdStore.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getRestaurantByIdStore.fulfilled, (state, action) => {
                state.loading = false
                state.restaurant = action.payload
            })
            .addCase(getRestaurantByIdStore.rejected, (state) => {
                state.loading = false
                state.error = 'Failed to fetch restaurant'
            })
    },
})

export default restaurantSlice.reducer
