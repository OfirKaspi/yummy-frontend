import { RootState } from '@/store/store'

export const selectIsDarkMode = (state: RootState) => state.darkMode.isDarkMode;
