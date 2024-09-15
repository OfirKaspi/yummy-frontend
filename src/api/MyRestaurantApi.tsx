import axios from "axios"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation } from "react-query"
import { toast } from "sonner"
import { Restaurant } from "@/types"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

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
        toast.error("Unable to update restaurant")
    }

    return { createRestaurant, isLoading }
}