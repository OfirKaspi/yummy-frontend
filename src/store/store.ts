import { configureStore } from '@reduxjs/toolkit'

import restaurantsReducer from '@/store/restaurants/restaurantsSlice'
import restaurantReducer from '@/store/restaurant/restaurantSlice'
import searchReducer from '@/store/search/searchSlice'

export type RootState = {
    restaurants: ReturnType<typeof restaurantsReducer>
    restaurant: ReturnType<typeof restaurantReducer>
    search: ReturnType<typeof searchReducer>
}

export const store = configureStore({
    reducer: {
        restaurants: restaurantsReducer,
        restaurant: restaurantReducer,
        search: searchReducer,
    },
})

export type AppDispatch = typeof store.dispatch

export default store