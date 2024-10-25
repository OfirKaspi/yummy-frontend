import { useMutation } from "react-query"
import { useAuth0 } from "@auth0/auth0-react"
import { CheckoutSessionRequest } from "@/types"
import { showToast } from "@/utils/showToast"
import { createCheckoutSessionRequest } from "@/api/orderAPI"

export const useCreateCheckoutSession = () => {
    const { getAccessTokenSilently } = useAuth0()

    const createCheckoutSessionFunction = async (checkoutSessionRequest: CheckoutSessionRequest) => {
        const accessToken = await getAccessTokenSilently()
        return createCheckoutSessionRequest(accessToken, checkoutSessionRequest)

    }
    const {
        mutateAsync: createCheckoutSession,
        isLoading,
        error,
        reset
    } = useMutation(createCheckoutSessionFunction)

    if (error) {
        showToast(error.toString(), "error")
        reset()
    }

    return {
        createCheckoutSession,
        isLoading
    }
}