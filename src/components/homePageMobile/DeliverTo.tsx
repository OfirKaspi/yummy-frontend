import { useDispatch, useSelector } from "react-redux"
import { ChevronDown } from "lucide-react"
import { useAuth0 } from "@auth0/auth0-react"
import { updateUserAddresses } from "@/store/user/userSlice"
import { selectUser, selectUserLoading } from "@/store/user/userSelectors"
import { AppDispatch } from "@/store/store"
import AddressListForm from "@/forms/user-profile-form/AddressListForm"
import { Address } from "@/types"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const DeliverTo = () => {
    const dispatch: AppDispatch = useDispatch()
    const currentUser = useSelector(selectUser)

    const isLoading = useSelector(selectUserLoading)
    const { getAccessTokenSilently } = useAuth0()

    const handleUpdateAddresses = async (addressData: Address[]) => {
        try {
            const accessToken = await getAccessTokenSilently()
            dispatch(updateUserAddresses({ accessToken, addresses: addressData }))
        } catch (error) {
            console.error("Error updating addresses:", error)
        }
    }

    if (!currentUser) {
        return <span className="flex items-center text-gray-600 gap-1">Login to add address</span>
    }

    return (
        <Sheet>
            <SheetTrigger className="flex flex-col gap-1 text-sm">
                <span className="text-orange-500 font-medium">DELIVER TO</span>
                <span className="flex items-center gap-1 text-gray-600">
                    {
                        currentUser.addresses.length
                            ? currentUser.addresses[0].addressLine1
                            : "Add your address"
                    }
                    <ChevronDown size={16} />
                </span>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl max-h-[500px] space-y-5 overflow-y-auto">
                <SheetTitle className="text-2xl font-normal">Address Form</SheetTitle>
                <AddressListForm
                    addresses={currentUser.addresses}
                    isLoading={isLoading}
                    onSave={handleUpdateAddresses}
                />
            </SheetContent>
        </Sheet >
    )
}
export default DeliverTo