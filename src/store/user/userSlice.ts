import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchOrCreateMyUserRequest, updateMyUserRequest } from '@/api/myUserAPI'
import { User, CreateUserRequest, UpdateMyUserRequest, Address } from '@/types'
import { showToast } from '@/utils/showToast'

interface UserState {
    user: User | null
    loading: boolean
    error: string | null
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
}

export const fetchOrCreateUser = createAsyncThunk('user/fetchOrCreateUser', async ({ accessToken, userData }: { accessToken: string, userData?: CreateUserRequest }) => {
    return await fetchOrCreateMyUserRequest(accessToken, userData)
})

export const updateUserName = createAsyncThunk('user/updateUserName', async ({ accessToken, name }: { accessToken: string, name: string }) => {
    const userData: UpdateMyUserRequest = { name }
    return await updateMyUserRequest(accessToken, userData)
})

export const updateUserAddresses = createAsyncThunk('user/updateUserAddresses', async ({ accessToken, addresses }: { accessToken: string, addresses: Address[] }) => {
    const userData: UpdateMyUserRequest = { addresses }
    return await updateMyUserRequest(accessToken, userData)
})

export const updateUserFavoriteRestaurants = createAsyncThunk('user/updateUserFavoriteRestaurants', async ({ accessToken, favoriteRestaurantId }: { accessToken: string, favoriteRestaurantId: string }) => {
    const userData: UpdateMyUserRequest = { favoriteRestaurantId }
    return await updateMyUserRequest(accessToken, userData)
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUser(state) {
            localStorage.removeItem("user");
            state.user = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrCreateUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchOrCreateUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false
            })
            .addCase(fetchOrCreateUser.rejected, (state) => {
                state.loading = false
                state.error = 'Failed to fetch or create user'
            })
            .addCase(updateUserName.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateUserName.fulfilled, (state, action) => {
                state.user = { ...state.user, name: action.payload.name } as User
                state.loading = false
            })
            .addCase(updateUserName.rejected, (state) => {
                state.loading = false
                state.error = 'Failed to update name'
            })
            .addCase(updateUserAddresses.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateUserAddresses.fulfilled, (state, action) => {
                state.user = { ...state.user, addresses: action.payload.addresses } as User
                state.loading = false
            })
            .addCase(updateUserAddresses.rejected, (state) => {
                state.loading = false
                state.error = 'Failed to update addresses'
            })
            .addCase(updateUserFavoriteRestaurants.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateUserFavoriteRestaurants.fulfilled, (state, action) => {
                const newRestaurants = action.payload.favoriteRestaurants

                if ((state.user?.favoriteRestaurants.length || 0) < newRestaurants.length) {
                    showToast(
                        `${newRestaurants[newRestaurants.length - 1].restaurantName} added to the favorites successfully`,
                        'success'
                    )
                }

                state.user = { ...state.user, favoriteRestaurants: newRestaurants } as User;
                state.loading = false
            })
            .addCase(updateUserFavoriteRestaurants.rejected, (state) => {
                state.loading = false
                state.error = 'Failed to update favorite restaurant'
            })
    }
})

export const { clearUser } = userSlice.actions;

export default userSlice.reducer
