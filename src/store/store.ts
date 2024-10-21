import { configureStore } from '@reduxjs/toolkit'
import restaurantsReducer from '@/store/restaurantsSlice'
import userReducer from '@/store/userSlice'
import searchReducer from '@/store/searchSlice'

export type RootState = {
    restaurants: ReturnType<typeof restaurantsReducer>
    user: ReturnType<typeof userReducer>
    search: ReturnType<typeof searchReducer>
}

export const store = configureStore({
    reducer: {
        restaurants: restaurantsReducer,
        user: userReducer,
        search: searchReducer,
    },
})

export type AppDispatch = typeof store.dispatch

export default store