import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ChevronDown } from "lucide-react"
import { useAuth0 } from "@auth0/auth0-react"
import { getGreeting } from "@/utils/getGreeting"
import { Address } from "@/types"
import { AppDispatch } from "@/store/store"
import { updateUserAddresses } from "@/store/user/userSlice"
import { selectUser, selectUserLoading } from "@/store/user/userSelectors"
import AddressListForm from "@/forms/user-profile-form/AddressListForm"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import MainNavMobile from "@/components/navigation/MainNavMobile"

const UserSection = () => {
    const dispatch: AppDispatch = useDispatch()
    const currentUser = useSelector(selectUser)
    const isLoading = useSelector(selectUserLoading)
    const [greeting, setGreeting] = useState("")
    const { getAccessTokenSilently } = useAuth0()

    useEffect(() => {
        setGreeting(getGreeting())
    }, [])

    const handleUpdateAddresses = async (addressData: Address[]) => {
        try {
            const accessToken = await getAccessTokenSilently()
            dispatch(updateUserAddresses({ accessToken, addresses: addressData }))
        } catch (error) {
            console.error("Error updating addresses:", error)
        }
    }

    return (
        <>
            <MainNavMobile isHomePage>
                <div className="flex justify-center flex-col text-sm">
                    <span className="text-orange-500 font-medium">DELIVER TO</span>
                    {
                        currentUser ? (
                            <Sheet>
                                <SheetTrigger className="flex items-center text-gray-600 gap-1">
                                    {
                                        currentUser.addresses.length
                                            ? currentUser.addresses[0].addressLine1
                                            : "Add your address"
                                    }
                                    <ChevronDown size={16} />
                                </SheetTrigger>
                                <SheetContent side="bottom" className="rounded-t-3xl max-h-[500px] space-y-5 overflow-y-auto">
                                    <SheetTitle className="text-2xl font-normal">Address Form</SheetTitle>
                                    <AddressListForm
                                        addresses={currentUser.addresses}
                                        isLoading={isLoading}
                                        onSave={handleUpdateAddresses}
                                    />
                                </SheetContent>
                            </Sheet>
                        ) : (
                            <span className="flex items-center text-gray-600 gap-1">Login to add address</span>
                        )
                    }
                </div>
            </MainNavMobile>
            <div className="flex items-center gap-1">
                <span>
                    Hey
                    {currentUser?.name ? ` ${currentUser.name},` : ","}
                </span>
                <span className="font-bold"> {greeting}!</span>
            </div>
        </>
    )
}

export default UserSection
