import { useLocation } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

import { Button } from "./ui/button"

import LoadingButton from "./LoadingButton"

const CheckoutButton = () => {
    const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0()
    const { pathname } = useLocation()

    const onLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname
            }
        })
    }

    if (isAuthLoading) {
        return <LoadingButton isFull />
    }

    if (!isAuthenticated) {
        return (
            <Button
                className="bg-orange-500 flex-1"
                onClick={onLogin}
            >
                Log in to check out
            </Button>
        )
    }

    return (
        <Button
            className="bg-orange-500 flex-1"
        >
            Check out
        </Button>
    )
}

export default CheckoutButton