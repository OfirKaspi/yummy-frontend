import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi"
import Loader from "@/components/Loader"
import MainNavMobile from "@/components/navigation/MainNavMobile"
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm"
import useDeviceType from "@/hooks/useDeviceType"

const UserProfilePage = () => {
    const { currentUser, isLoading: isGetLoading } = useGetMyUser()
    const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser()
    const { isMobile } = useDeviceType()

    if (isGetLoading) {
        return <Loader />
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
            <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading} />
        </div>
    )
}

export default UserProfilePage