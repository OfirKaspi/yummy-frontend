import axios from "axios"
import { useQuery } from "react-query"

import { Restaurant, RestaurantSearchResponse } from "@/types"
import { SearchState } from "@/pages/searchPage/SearchPage"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useGetRestaurant = (restaurantId?: string) => {
    const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
        try {
            const response = axios.get(`${API_BASE_URL}/api/restaurant/${restaurantId}`)
            return (await response).data
        } catch (error) {
            console.error("Error getting restaurant:", error)
            throw new Error("Failed to get restaurant")
        }
    }

    const { data: restaurant, isLoading } = useQuery(
        "fetchRestaurant",
        getRestaurantByIdRequest,
        {
            enabled: !!restaurantId
        }
    )

    return { restaurant, isLoading }
}


export const useSearchRestaurant = (searchState: SearchState, city?: string) => {
    const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
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

    const { data: results, isLoading } = useQuery(
        ["searchRestaurants", searchState],
        createSearchRequest,
        { enabled: !!city }
    )

    return { results, isLoading }
}