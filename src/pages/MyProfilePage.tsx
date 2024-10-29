import { useSelector, useDispatch } from "react-redux"
import { useAuth0 } from "@auth0/auth0-react"
import MainNavMobile from "@/components/navigation/MainNavMobile"
import { Separator } from "@/components/ui/separator"
import UserNameForm from "@/forms/user-profile-form/UserNameForm"
import AddressListForm from "@/forms/user-profile-form/AddressListForm"
import useDeviceType from "@/hooks/useDeviceType"
import { selectUser, selectUserLoading } from "@/store/user/userSelectors"
import { updateUserName, updateUserAddresses } from "@/store/user/userSlice"
import { AppDispatch } from "@/store/store"
import { Address } from "@/types"
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { SkeletonCard } from "@/components/ui/skeleton"

const MyProfilePage = () => {
    const dispatch: AppDispatch = useDispatch()
    const { getAccessTokenSilently } = useAuth0()
    const currentUser = useSelector(selectUser)
    const isGetUserLoading = useSelector(selectUserLoading)
    const { isMobile } = useDeviceType()
    const [activeTab, setActiveTab] = useState("profile-form")

    const handleUpdateName = async (userNameData: { name: string }) => {
        try {
            const accessToken = await getAccessTokenSilently()
            dispatch(updateUserName({ accessToken, name: userNameData.name }))
        } catch (error) {
            console.error("Error updating name:", error)
        }
    }

    const handleUpdateAddresses = async (addressData: Address[]) => {
        try {
            const accessToken = await getAccessTokenSilently()
            dispatch(updateUserAddresses({ accessToken, addresses: addressData }))
        } catch (error) {
            console.error("Error updating addresses:", error)
        }
    }

    return (
        <div className="space-y-5">
            {isMobile &&
                <MainNavMobile>
                    My Profile
                </MainNavMobile>
            }
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-5">
                <TabsList className={`${isMobile && 'flex'}`}>
                    <TabsTrigger value="profile-form" className={`${isMobile && 'flex-1'}`}>Profile Form</TabsTrigger>
                    <TabsTrigger value="address-form" className={`${isMobile && 'flex-1'}`}>Address Form</TabsTrigger>
                </TabsList>
                <Separator />
                {isGetUserLoading ? (
                    <SkeletonCard />
                ) : !currentUser ? (
                    <span>Unable to load user profile</span>
                ) : (
                    <>
                        <TabsContent value="profile-form">
                            <UserNameForm
                                currentUser={currentUser}
                                onSave={handleUpdateName}
                                isLoading={isGetUserLoading}
                            />
                        </TabsContent>
                        <TabsContent value="address-form">
                            <AddressListForm
                                addresses={currentUser.addresses}
                                onSave={handleUpdateAddresses}
                                isLoading={isGetUserLoading}
                            />
                        </TabsContent>
                    </>
                )}
            </Tabs>
        </div>
    )
}

export default MyProfilePage
