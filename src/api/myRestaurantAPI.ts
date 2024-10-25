import axios from 'axios'
import { Restaurant, Order } from '@/types'
import { UpdateOrderStatusRequest } from '@/hooks/myRestaurant/useUpdateMyRestaurantOrder'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getMyRestaurantRequest = async (accessToken: string): Promise<Restaurant> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/my/restaurant`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        return response.data
    } catch (error) {
        console.error('Error fetching restaurant:', error)
        throw new Error('Failed to fetch restaurant')
    }
}

export const createMyRestaurantRequest = async (accessToken: string, restaurantFormData: FormData): Promise<Restaurant> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/my/restaurant`, restaurantFormData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        return response.data
    } catch (error) {
        console.error('Error creating restaurant:', error)
        throw new Error('Failed to create restaurant')
    }
}

export const updateMyRestaurantRequest = async (accessToken: string, restaurantFormData: FormData): Promise<Restaurant> => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/my/restaurant`, restaurantFormData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        return response.data
    } catch (error) {
        console.error('Error updating restaurant:', error)
        throw new Error('Failed to update restaurant')
    }
}

export const getMyRestaurantOrdersRequest = async (accessToken: string): Promise<Order[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/my/restaurant/order`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        return response.data
    } catch (error) {
        console.error('Error fetching restaurant orders:', error)
        throw new Error('Failed to fetch restaurant orders')
    }
}

export const updateMyRestaurantOrder = async (
    accessToken: string,
    updateStatusOrderRequest: UpdateOrderStatusRequest
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
    try {
        const response = await axios.patch(
            `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
            { status: updateStatusOrderRequest.status },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )
        return response.data
    } catch (error) {
        console.error('Error updating order status:', error)
        throw new Error('Failed to update order status')
    }
}
