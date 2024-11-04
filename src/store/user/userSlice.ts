import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getMyUserRequest, createMyUserRequest, updateMyUserRequest } from '@/api/myUserAPI'
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

export const getUser = createAsyncThunk('user/getUser', async (accessToken: string) => {
    return await getMyUserRequest(accessToken)
})

export const createUser = createAsyncThunk('user/createUser', async ({ accessToken, userData }: { accessToken: string, userData: CreateUserRequest }) => {
    return await createMyUserRequest(accessToken, userData)
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
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false
            })
            .addCase(getUser.rejected, (state) => {
                state.loading = false
                state.error = 'Failed to get user'
                showToast('Failed to get user', 'error')
            })
            .addCase(createUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false
                // showToast('User created!', 'success')
            })
            .addCase(createUser.rejected, (state) => {
                state.loading = false
                state.error = 'Failed to create user'
                showToast('Failed to create user', 'error')
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

export default userSlice.reducer
