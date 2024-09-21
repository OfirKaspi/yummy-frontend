import axios from "axios"
import { useQuery } from "react-query"

import { RestaurantSearchResponse } from "@/types"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useSearchRestaurant = (city?: string) => {
    const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/restaurant/search/${city}`)
            return response.data
        } catch (error) {
            console.error("Error getting restaurant:", error)
            throw new Error("Failed to get restaurant")
        }
    }

    const { data: results, isLoading } = useQuery(
        ["searchRestaurants"],
        createSearchRequest,
        { enabled: !!city }
    )

    return { results, isLoading }
}