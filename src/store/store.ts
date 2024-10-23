import { configureStore } from '@reduxjs/toolkit'

import restaurantsReducer from '@/store/restaurants/restaurantsSlice'
import restaurantReducer from '@/store/restaurant/restaurantSlice'
import userReducer from '@/store/userSlice'
import searchReducer from '@/store/search/searchSlice'

export type RootState = {
    restaurants: ReturnType<typeof restaurantsReducer>
    restaurant: ReturnType<typeof restaurantReducer>
    user: ReturnType<typeof userReducer>
    search: ReturnType<typeof searchReducer>
}

export const store = configureStore({
    reducer: {
        restaurants: restaurantsReducer,
        restaurant: restaurantReducer,
        user: userReducer,
        search: searchReducer,
    },
})

export type AppDispatch = typeof store.dispatch

export default store