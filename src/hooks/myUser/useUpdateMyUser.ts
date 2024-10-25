import { useMutation } from "react-query"
import { showToast } from "@/utils/showToast"
import { useAuth0 } from "@auth0/auth0-react"
import { updateMyUserRequest } from "@/api/myUserAPI"
import { UpdateMyUserRequest } from "@/types"

export const useUpdateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0()

    const updateMyUser = async (formData: UpdateMyUserRequest) => {
        const accessToken = await getAccessTokenSilently()
        return updateMyUserRequest(accessToken, formData)
    }

    const {
        mutateAsync: updateUser,
        isLoading,
        isSuccess,
        error,
        reset,
    } = useMutation(updateMyUser)

    if (isSuccess) {
        showToast("User profile updated!", "success")
    }

    if (error) {
        showToast(error.toString(), "error")
        reset()
    }

    return {
        updateUser,
        isLoading,
    }
}