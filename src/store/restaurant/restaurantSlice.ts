import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RestaurantState { }

const initialState: RestaurantState = {}

export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {},
});

// export const {} = restaurantSlice.actions;
export default restaurantSlice.reducer;