import { RootState } from '@/store/store';

export const selectRestaurant = (state: RootState) => state.restaurant.restaurant;
export const selectRestaurantLoading = (state: RootState) => state.restaurant.loading;
export const selectRestaurantError = (state: RootState) => state.restaurant.error;
