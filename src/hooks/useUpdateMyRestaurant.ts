import { useMutation } from 'react-query'
import { updateMyRestaurantRequest } from '@/api/myRestaurantAPI'
import { useAuth0 } from '@auth0/auth0-react'
import { showToast } from '@/utils/showToast'

export const useUpdateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0()

    const updateRestaurantRequest = async (restaurantFormData: FormData) => {
        const accessToken = await getAccessTokenSilently()
        return updateMyRestaurantRequest(accessToken, restaurantFormData)
    }

    const { mutate: updateRestaurant, isLoading, isSuccess, error } = useMutation(updateRestaurantRequest)

    if (isSuccess) {
        showToast('Restaurant updated!', 'success')
    }

    if (error) {
        showToast('Unable to update restaurant', 'error')
    }

    return { updateRestaurant, isLoading }
}
