import { UserFormData } from '@/forms/user-profile-form/UserDetailsOrderForm'
import { useMutation } from "react-query"
import { useAuth0 } from "@auth0/auth0-react"
import { CartItem, CheckoutSessionRequest, Restaurant } from '@/types'
import { createCheckoutSessionRequest } from "@/api/orderAPI"
import { showToast } from "@/utils/showToast"

const useCheckout = (restaurant: Restaurant, cartItems: CartItem[]) => {
    const { getAccessTokenSilently } = useAuth0()

    // Mutation to create a checkout session
    const { mutateAsync: createCheckoutSession, isLoading: isCheckoutLoading } = useMutation(
        async (checkoutData: CheckoutSessionRequest) => {
            const accessToken = await getAccessTokenSilently()
            return createCheckoutSessionRequest(accessToken, checkoutData)
        },
        {
            onError: (error: Error) => {
                showToast(error.toString(), "error")
            }
        }
    )

    const onCheckout = async (userFormData: UserFormData) => {
        if (!restaurant) return

        const checkoutData = {
            cartItems: cartItems.map((cartItem) => ({
                ...cartItem,
            })),
            restaurantId: restaurant._id,
            deliveryDetails: {
                name: userFormData.name,
                addressLine1: userFormData.addressLine1,
                city: userFormData.city,
                country: userFormData.country,
                email: userFormData.email
            }
        }

        try {
            const data = await createCheckoutSession(checkoutData)
            window.location.href = data.url
        } catch (error) {
            console.error("Checkout session creation failed", error)
        }
    }

    return { onCheckout, isCheckoutLoading }
}

export default useCheckout
