import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState { }

const initialState: UserState = {}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
})

// export const {} = userSlice.actions
export default userSlice.reducer