import { useGetMyUser, useUpdateMyUser } from "@/api/myUserAPI"
import Loader from "@/components/Loader"
import MainNavMobile from "@/components/navigation/MainNavMobile"
import { Separator } from "@/components/ui/separator"
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm"
import useDeviceType from "@/hooks/useDeviceType"

const MyProfilePage = () => {
    const { currentUser, isLoading: isGetUserLoading } = useGetMyUser()
    const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser()
    const { isMobile } = useDeviceType()

    if (isGetUserLoading) {
        return <Loader isFullScreen />
    }

    if (!currentUser) {
        return <span>Unable to load user profile</span>
    }

    return (
        <div className="space-y-5">
            {isMobile &&
                <MainNavMobile>
                    My Profile
                </MainNavMobile>
            }
            <Separator />
            <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading} />
        </div>
    )
}

export default MyProfilePage