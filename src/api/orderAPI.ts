import axios from "axios"
import { CheckoutSessionRequest, Order } from "@/types"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getMyOrdersRequest = async (accessToken: string): Promise<Order[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/order`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response.data
    } catch (error) {
        console.error("Error getting my orders:", error)
        throw new Error("Failed to get my orders")
    }
}

export const createCheckoutSessionRequest = async (accessToken: string, checkoutSessionRequest: CheckoutSessionRequest) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
            checkoutSessionRequest, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
        return response.data
    } catch (error) {
        console.error("Error creating order:", error)
        throw new Error("Failed to create order")
    }

}
