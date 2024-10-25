import { useLocation } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

import UserProfileForm, { UserFormData } from "@/forms/user-profile-form/UserProfileForm"
import { useGetMyUser } from "@/hooks/myUser/useGetMyUser"
import LoadingButton from "@/components/LoadingButton"
import useDeviceType from "@/hooks/useDeviceType"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

type Props = {
    onCheckout: (userFormData: UserFormData) => void
    disabled: boolean
    isLoading: boolean
}

const CheckoutButton = ({ disabled, onCheckout, isLoading }: Props) => {
    const { isMobile, isDesktop } = useDeviceType()
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

    if (isAuthLoading || !currentUser || isLoading) {
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

    if (isMobile) {
        return (
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        disabled={disabled}
                        className="bg-orange-500 flex-1"
                    >
                        Go to check out
                    </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-3xl">
                    <UserProfileForm
                        currentUser={currentUser}
                        onSave={onCheckout}
                        isLoading={isGetUserLoading}
                        title="Confirm Delivery Details"
                        buttonText="Continue to payment"
                    />
                </SheetContent>
            </Sheet>
        )
    }

    if (isDesktop) {
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
                        title="Confirm Delivery Details"
                        buttonText="Continue to payment"
                    />
                </DialogContent>
            </Dialog>
        )
    }

}

export default CheckoutButton