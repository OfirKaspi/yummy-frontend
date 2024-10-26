import { useQuery } from 'react-query'
import { getMyRestaurantOrdersRequest } from '@/api/myRestaurantAPI'
import { useAuth0 } from '@auth0/auth0-react'

export const useGetMyRestaurantOrders = () => {
    const { getAccessTokenSilently } = useAuth0()

    const getMyRestaurantOrders = async () => {
        const accessToken = await getAccessTokenSilently()
        return getMyRestaurantOrdersRequest(accessToken)
    }

    const { data: orders, isLoading } = useQuery('getMyRestaurantOrders', getMyRestaurantOrders)

    return { orders, isLoading }
}
