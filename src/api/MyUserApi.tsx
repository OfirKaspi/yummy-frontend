import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"
import { useMutation } from "react-query"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

type CreateUserRequest = {
    auth0Id: string
    email: string
}

export const useCreateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0()


    const createMyUserRequest = async (user: CreateUserRequest) => {
        try {
            const accessToken = await getAccessTokenSilently()
            await axios.post(`${API_BASE_URL}/api/my/user`, user, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            })
        } catch (error) {
            console.error("Error creating user:", error)
            throw new Error("Failed to create user")
        }
    }


    const {
        mutateAsync: createUser,
        isLoading,
        isError,
        isSuccess
    } = useMutation(createMyUserRequest)

    return {
        createUser,
        isLoading,
        isError,
        isSuccess
    }
}

type UpdateMyUserRequest = {
    name: string
    addressLine1: string
    city: string
    country: string
}

export const useUpdateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0()

    const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await axios.put(`${API_BASE_URL}/api/my/user`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            })

            return response.data
        } catch (error) {
            console.error("Error updating user:", error)
            throw new Error("Failed to update user")
        }
    }

    const {
        mutateAsync: updateUser,
        isLoading,
        isSuccess,
        error,
        reset,
    } = useMutation(updateMyUserRequest)

    if (isSuccess) {
        toast.success("User profile updated!")
    }

    if (error) {
        toast.error(error.toString())
        reset()
    }

    return {
        updateUser,
        isLoading,
    }
}