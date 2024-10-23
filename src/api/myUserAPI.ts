import axios from "axios"
import { useMutation, useQuery } from "react-query"
import { User } from "@/types"
import { showToast } from "@/utils/showToast"
import { useAuth0 } from "@auth0/auth0-react"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

type CreateUserRequest = {
    auth0Id: string
    email: string
}

export const useGetMyUser = () => {
    const { getAccessTokenSilently } = useAuth0()

    const getMyUserRequest = async (): Promise<User> => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await axios.get(`${API_BASE_URL}/api/my/user`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            })

            return response.data
        } catch (error) {
            console.error("Error getting user:", error)
            throw new Error("Failed to get user")
        }
    }

    const {
        data: currentUser,
        isLoading,
        error,
    } = useQuery("getCurrentUser", getMyUserRequest)

    if (error) {
        showToast(error.toString(), "error")
    }

    return { currentUser, isLoading }
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
        error,
        isSuccess
    } = useMutation(createMyUserRequest)

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