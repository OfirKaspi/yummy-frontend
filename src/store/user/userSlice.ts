import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getMyUserRequest, createMyUserRequest, updateMyUserRequest } from '@/api/myUserAPI'
import { User, CreateUserRequest, UpdateMyUserRequest } from '@/types'
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

export const createUser = createAsyncThunk('user/createUser', async ({ accessToken, user }: { accessToken: string, user: CreateUserRequest }) => {
    return await createMyUserRequest(accessToken, user)
})

export const updateUser = createAsyncThunk('user/updateUser', async ({ accessToken, userData }: { accessToken: string, userData: UpdateMyUserRequest }) => {
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
                showToast('User created!', 'success')
            })
            .addCase(createUser.rejected, (state) => {
                state.loading = false
                state.error = 'Failed to create user'
                showToast('Failed to create user', 'error')
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false
            })
            .addCase(updateUser.rejected, (state) => {
                state.loading = false
                state.error = 'Failed to update user'
                showToast('Failed to update user', 'error')
            })
    }
})

export default userSlice.reducer
