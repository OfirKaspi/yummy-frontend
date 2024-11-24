import { useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchOrCreateUser } from "@/store/user/userSlice"
import { useAuth0 } from "@auth0/auth0-react"
import Loader from "@/components/Loader"
import { CreateUserRequest } from "@/types"
import { AppDispatch } from "@/store/store"

const AuthCallbackPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch: AppDispatch = useDispatch()
    const { user, getAccessTokenSilently } = useAuth0()
    const isUserCreationInProgress = useRef(false)

    useEffect(() => {
        const returnTo = location.state?.returnTo || "/"

        const createUserWithToken = async () => {
            if (isUserCreationInProgress.current) return
            if (user?.sub && user?.email && user?.name) {
                isUserCreationInProgress.current = true
                try {
                    const accessToken = await getAccessTokenSilently()
                    const userData: CreateUserRequest = {
                        auth0Id: user.sub,
                        email: user.email,
                        name: user.name,
                    }
                    await dispatch(fetchOrCreateUser({ accessToken, userData }))
                } catch (error) {
                    console.error("Error creating user:", error)
                } finally {
                    isUserCreationInProgress.current = false
                }
            }
        }

        createUserWithToken()
        navigate(returnTo)
    }, [dispatch, navigate, user, location, getAccessTokenSilently])

    return (
        <Loader isFullScreen />
    )
}

export default AuthCallbackPage
