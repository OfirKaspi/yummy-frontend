import { useQuery } from 'react-query'
import { getMyRestaurantRequest } from '@/api/myRestaurantAPI'
import { useAuth0 } from '@auth0/auth0-react'

export const useGetMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0()

    const getMyRestaurant = async () => {
        const accessToken = await getAccessTokenSilently()
        return getMyRestaurantRequest(accessToken)
    }

    const { data: restaurant, isLoading } = useQuery('getMyRestaurant', getMyRestaurant)

    return { restaurant, isLoading }
}
