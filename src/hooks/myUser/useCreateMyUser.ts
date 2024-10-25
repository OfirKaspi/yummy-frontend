import { useMutation } from "react-query"
import { showToast } from "@/utils/showToast"
import { useAuth0 } from "@auth0/auth0-react"
import { createMyUserRequest } from "@/api/myUserAPI"
import { CreateUserRequest } from "@/types"

export const useCreateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0()

    const createMyUser = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently()
        return createMyUserRequest(accessToken, user)
    }

    const {
        mutateAsync: createUser,
        isLoading,
        error,
        isSuccess
    } = useMutation(createMyUser)

    if (isSuccess) {
        showToast("User profile updated!", "success")
    }

    if (error) {
        showToast(error.toString(), "error")
    }

    return {
        createUser,
        isLoading,
    }
}
