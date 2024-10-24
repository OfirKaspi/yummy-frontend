import { useMutation } from 'react-query'
import { updateMyRestaurantOrder } from '@/api/myRestaurantAPI'
import { useAuth0 } from '@auth0/auth0-react'
import { showToast } from '@/utils/showToast'

export type UpdateOrderStatusRequest = {
    orderId: string
    status: string
}

export const useUpdateMyRestaurantOrder = () => {
    const { getAccessTokenSilently } = useAuth0()

    const updateRestaurantStatusRequest = async (updateStatusOrderRequest: UpdateOrderStatusRequest) => {
        const accessToken = await getAccessTokenSilently()
        return updateMyRestaurantOrder(accessToken, updateStatusOrderRequest)
    }

    const { mutateAsync: updateRestaurantStatus, isLoading, isError, isSuccess, reset } = useMutation(updateRestaurantStatusRequest)

    if (isSuccess) {
        showToast('Order updated', 'success')
    }

    if (isError) {
        showToast('Unable to update order', 'error')
        reset()
    }

    return { updateRestaurantStatus, isLoading }
}
