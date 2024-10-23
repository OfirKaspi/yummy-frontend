import axios from "axios"
import { Restaurant } from "@/types"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getRestaurantById = async (restaurantId?: string): Promise<Restaurant> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/restaurant/${restaurantId}`)
        return response.data
    } catch (error) {
        console.error("Error getting restaurant:", error)
        throw new Error("Failed to get restaurant")
    }
}