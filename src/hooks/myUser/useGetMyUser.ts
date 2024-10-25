import { useQuery } from "react-query"
import { showToast } from "@/utils/showToast"
import { useAuth0 } from "@auth0/auth0-react"
import { getMyUserRequest } from "@/api/myUserAPI"

export const useGetMyUser = () => {
    const { getAccessTokenSilently } = useAuth0()

    const getMyUser = async () => {
        const accessToken = await getAccessTokenSilently()
        return getMyUserRequest(accessToken)
    }

    const {
        data: currentUser,
        isLoading,
        error,
    } = useQuery("getMyUser", getMyUser)

    if (error) {
        showToast(error.toString(), "error")
    }

    return { currentUser, isLoading }
}
