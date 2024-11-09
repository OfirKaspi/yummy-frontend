import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { useAuth0 } from "@auth0/auth0-react"

import { selectUser, selectUserLoading } from "@/store/user/userSelectors"
import useDeviceType from "@/hooks/useDeviceType"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import UserProfileForm, { UserFormData } from "@/forms/user-profile-form/UserDetailsOrderForm"
import LoadingButton from "@/components/LoadingButton"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

type Props = {
    onCheckout: (userFormData: UserFormData) => void
    disabled: boolean
    isLoading: boolean
}

const CheckoutButton = ({ disabled, onCheckout, isLoading }: Props) => {
    const { isMobile } = useDeviceType()
    const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0()
    const { pathname } = useLocation()
    const currentUser = useSelector(selectUser)
    const isGetUserLoading = useSelector(selectUserLoading)

    const onLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname
            }
        })
    }

    if (isAuthLoading || isGetUserLoading || !currentUser || isLoading) {
        return <LoadingButton isFull />
    }

    if (!isAuthenticated) {
        return (
            <Button
                className="bg-orange-500 flex-1 dark:text-white dark:hover:bg-orange-400 "
                onClick={onLogin}
            >
                Log in to check out
            </Button>
        )
    }

    const renderCheckoutContent = () => (
        <UserProfileForm
            currentUser={currentUser}
            onSave={onCheckout}
            isLoading={isGetUserLoading}
            title="Confirm Delivery Details"
            buttonText="Continue to payment"
        />
    )

    return isMobile ? (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    disabled={disabled}
                    className="bg-orange-500 flex-1 dark:text-white dark:hover:bg-orange-400"
                >
                    Go to check out
                </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl">
                {renderCheckoutContent()}
            </SheetContent>
        </Sheet>
    ) : (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    disabled={disabled}
                    className="bg-orange-500 flex-1 dark:text-white dark:hover:bg-orange-400"
                >
                    Go to check out
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[26rem] md:min-w-[44rem]">
                {renderCheckoutContent()}
            </DialogContent>
        </Dialog>
    )
}

export default CheckoutButton
