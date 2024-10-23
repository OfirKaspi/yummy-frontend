
import { RootState } from '@/store/store'

export const selectRestaurants = (state: RootState) => state.restaurants.restaurants
export const selectPagination = (state: RootState) => state.restaurants.pagination
export const selectPaginationTotal = (state: RootState) => state.restaurants.pagination?.total || 0
export const selectLoading = (state: RootState) => state.restaurants.loading
export const selectError = (state: RootState) => state.restaurants.error