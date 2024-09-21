import axios from "axios"
import { useQuery } from "react-query"

import { RestaurantSearchResponse } from "@/types"
import { SearchState } from "@/pages/SearchPage"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useSearchRestaurant = (searchState: SearchState, city?: string) => {
    const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
        const params = new URLSearchParams()
        params.set("searchQuery", searchState.searchQuery)
        params.set("page", searchState.page.toString())

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

    const { data: results, isLoading } = useQuery(
        ["searchRestaurants", searchState],
        createSearchRequest,
        { enabled: !!city }
    )

    return { results, isLoading }
}