import axios from "axios"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"
import { Order, Restaurant } from "@/types"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useGetMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0()

    const getMyRestaurantRequest = async (): Promise<Restaurant> => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await axios.get(`${API_BASE_URL}/api/my/restaurant`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })

            return response.data
        } catch (error) {
            console.error("Error getting restaurant:", error)
            throw new Error("Failed to get restaurant")
        }
    }

    const { data: restaurant, isLoading } = useQuery(
        "fetchMyRestaurant",
        getMyRestaurantRequest
    )

    return { restaurant, isLoading }
}

export const useCreateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0()

    const createMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await axios.post(`${API_BASE_URL}/api/my/restaurant`, restaurantFormData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })

            return response.data
        } catch (error) {
            console.error("Error creating restaurant:", error)
            throw new Error("Failed to create restaurant")
        }
    }

    const {
        mutate: createRestaurant,
        isLoading,
        isSuccess,
        error,
    } = useMutation(createMyRestaurantRequest)

    if (isSuccess) {
        toast.success("Restaurant created!")
    }

    if (error) {
        toast.error("Unable to create restaurant")
    }

    return { createRestaurant, isLoading }
}

export const useUpdateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0()

    const updateMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await axios.put(`${API_BASE_URL}/api/my/restaurant`, restaurantFormData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })

            return response.data
        } catch (error) {
            console.error("Error updating restaurant:", error)
            throw new Error("Failed to update restaurant")
        }
    }

    const {
        mutate: updateRestaurant,
        isLoading,
        isSuccess,
        error,
    } = useMutation(updateMyRestaurantRequest)

    if (isSuccess) {
        toast.success("Restaurant updated!")
    }

    if (error) {
        toast.error("Unable to update restaurant")
    }

    return { updateRestaurant, isLoading }
}

export const useGetMyRestaurantOrders = () => {
    const { getAccessTokenSilently } = useAuth0()

    const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await axios.get(`${API_BASE_URL}/api/my/restaurant/order`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })

            return response.data
        } catch (error) {
            console.error("Error getting restaurant orders:", error)
            throw new Error("Failed to get restaurant orders")
        }
    }

    const { data: orders, isLoading } = useQuery(
        "fetchMyRestaurantOrders",
        getMyRestaurantOrdersRequest
    )

    return { orders, isLoading }
}