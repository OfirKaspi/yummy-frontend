import { Order } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

type CheckoutSessionRequest = {
    cartItems: {
        menuItemId: string
        name: string
        quantity: string
    }[]
    deliveryDetails: {
        email: string
        name: string
        addressLine1: string
        city: string
    }
    restaurantId: string
}

export const useGetMyOrders = () => {
    const { getAccessTokenSilently } = useAuth0()

    const getMyOrdersRequest = async (): Promise<Order[]> => {
        try {
            const accessToken = await getAccessTokenSilently()
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

    const { data: orders, isLoading, refetch } = useQuery(
        "fetchMyOrders",
        getMyOrdersRequest,
        {
            staleTime: 60 * 1000,
            refetchInterval: false,
        }
    )

    return { orders, isLoading, refetch }
}

export const useCreateCheckoutSession = () => {
    const { getAccessTokenSilently } = useAuth0()

    const createCheckoutSessionRequest = async (checkoutSessionRequest: CheckoutSessionRequest) => {
        try {
            const accessToken = await getAccessTokenSilently()
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
    const {
        mutateAsync: createCheckoutSession,
        isLoading,
        error,
        reset
    } = useMutation(createCheckoutSessionRequest)

    if (error) {
        toast.error(error.toString())
        reset()
    }

    return {
        createCheckoutSession,
        isLoading
    }
}