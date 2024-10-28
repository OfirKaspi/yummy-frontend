import { RootState } from '@/store/store'
import { User } from '@/types'

export const selectUser = (state: RootState): User | null => state.user.user
export const selectAddresses = (state: RootState) => state.user.user?.addresses || []
export const selectFavoriteRestaurants = (state: RootState) => state.user.user?.favoriteRestaurants || []
export const selectOrders = (state: RootState) => state.user.user?.orders || []
export const selectUserLoading = (state: RootState): boolean => state.user.loading
export const selectUserError = (state: RootState): string | null => state.user.error
