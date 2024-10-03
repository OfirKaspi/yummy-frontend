import { useLocation } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"

import UserProfileForm, { UserFormData } from "@/forms/user-profile-form/UserProfileForm"
import { useGetMyUser } from "@/api/MyUserApi"
import LoadingButton from "./LoadingButton"

type Props = {
    onCheckout: (userFormData: UserFormData) => void
    disabled: boolean
}

const CheckoutButton = ({ disabled, onCheckout }: Props) => {
    const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0()
    const { pathname } = useLocation()
    const { currentUser, isLoading: isGetUserLoading } = useGetMyUser()

    const onLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname
            }
        })
    }

    if (isAuthLoading || !currentUser) {
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
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    disabled={disabled}
                    className="bg-orange-500 flex-1"
                >
                    Go to check out
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[26rem] md:min-w-[44rem] bg-gray-50">
                <UserProfileForm
                    currentUser={currentUser}
                    onSave={onCheckout}
                    isLoading={isGetUserLoading}
                />
            </DialogContent>
        </Dialog>
    )
}

export default CheckoutButton