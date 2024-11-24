import axios from "axios"
import { CreateUserRequest, UpdateMyUserRequest, User } from "@/types"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const fetchOrCreateMyUserRequest = async (accessToken: string, userData?: CreateUserRequest): Promise<User> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/my/user`, userData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response.data
    } catch (error) {
        console.error("Error fetching or creating user:", error)
        throw new Error("Failed to fetch or create user")
    }
}

export const updateMyUserRequest = async (accessToken: string, formData: UpdateMyUserRequest): Promise<User> => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/my/user`, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        return response.data
    } catch (error) {
        console.error("Error updating user:", error)
        throw new Error("Failed to update user")
    }
}
