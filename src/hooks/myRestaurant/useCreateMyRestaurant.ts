import { useMutation } from 'react-query'
import { createMyRestaurantRequest } from '@/api/myRestaurantAPI'
import { useAuth0 } from '@auth0/auth0-react'
import { showToast } from '@/utils/showToast'

export const useCreateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0()

    const createRestaurantRequest = async (restaurantFormData: FormData) => {
        const accessToken = await getAccessTokenSilently()
        return createMyRestaurantRequest(accessToken, restaurantFormData)
    }

    const { mutate: createRestaurant, isLoading, isSuccess, error } = useMutation(createRestaurantRequest)

    if (isSuccess) {
        showToast('Restaurant created!', 'success')
    }

    if (error) {
        showToast('Unable to create restaurant', 'error')
    }

    return { createRestaurant, isLoading }
}
