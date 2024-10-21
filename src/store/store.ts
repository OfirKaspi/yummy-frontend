import { configureStore } from '@reduxjs/toolkit'
import restaurantReducer from '@/store/restaurant/restaurantSlice'
import userReducer from '@/store/user/userSlice'

export const store = configureStore({
    reducer: {
        restaurantReducer,
        userReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch