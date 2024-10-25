import { useQuery } from "react-query"
import { Order } from "@/types"
import { useAuth0 } from "@auth0/auth0-react"
import { getMyOrdersRequest } from "@/api/orderAPI"


export const useGetMyOrders = () => {
    const { getAccessTokenSilently } = useAuth0()

    const getMyOrders = async (): Promise<Order[]> => {
        const accessToken = await getAccessTokenSilently()
        return getMyOrdersRequest(accessToken)
    }

    const { data: orders, isLoading, refetch } = useQuery(
        "getMyOrders",
        getMyOrders,
        {
            staleTime: 60 * 1000,
            refetchInterval: false,
        }
    )

    return { orders, isLoading, refetch }
}