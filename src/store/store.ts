import { configureStore } from '@reduxjs/toolkit'

import restaurantsReducer from '@/store/restaurants/restaurantsSlice'
import restaurantReducer from '@/store/restaurant/restaurantSlice'
import searchReducer from '@/store/search/searchSlice'
import userReducer from '@/store/user/userSlice'
import darkModeReducer from '@/store/darkMode/darkModeSlice'

export type RootState = {
    restaurants: ReturnType<typeof restaurantsReducer>
    restaurant: ReturnType<typeof restaurantReducer>
    search: ReturnType<typeof searchReducer>
    user: ReturnType<typeof userReducer>
    darkMode: ReturnType<typeof darkModeReducer>
}

export const store = configureStore({
    reducer: {
        restaurants: restaurantsReducer,
        restaurant: restaurantReducer,
        search: searchReducer,
        user: userReducer,
        darkMode: darkModeReducer,
    },
})

export type AppDispatch = typeof store.dispatch

export default store