import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { combineReducers } from "redux"

import restaurantsReducer from "@/store/restaurants/restaurantsSlice"
import restaurantReducer from "@/store/restaurant/restaurantSlice"
import searchReducer from "@/store/search/searchSlice"
import userReducer from "@/store/user/userSlice"
import darkModeReducer from "@/store/darkMode/darkModeSlice"

const persistConfig = {
    key: "root",
    storage,
}

const rootReducer = combineReducers({
    restaurants: restaurantsReducer,
    restaurant: restaurantReducer,
    search: searchReducer,
    user: userReducer,
    darkMode: darkModeReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default store
