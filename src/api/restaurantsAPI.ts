import { RestaurantSearchResponse, SearchState } from "@/types"
import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getRestaurants = async (searchState: SearchState, city?: string): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams()
    params.set("searchQuery", searchState.searchQuery)
    params.set("page", searchState.page.toString())
    params.set("selectedCuisines", searchState.selectedCuisines.join(","))
    params.set("sortOption", searchState.sortOption)

    try {
        const response = await axios.get(
            `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
        )
        return response.data
    } catch (error) {
        console.error("Error getting restaurant:", error)
        throw new Error("Failed to get restaurant")
    }
}