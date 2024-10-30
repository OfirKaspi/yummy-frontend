import { useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { createUser } from "@/store/user/userSlice"
import { useAuth0 } from "@auth0/auth0-react"
import Loader from "@/components/Loader"
import { CreateUserRequest } from "@/types"
import { AppDispatch } from "@/store/store"

const AuthCallbackPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const hasCreatedUser = useRef(false)
    const dispatch: AppDispatch = useDispatch()
    const { user, getAccessTokenSilently } = useAuth0()

    useEffect(() => {
        const returnTo = location.state?.returnTo || "/"

        const createUserWithToken = async () => {
            if (user?.sub && user?.email && !hasCreatedUser.current) {
                try {
                    const accessToken = await getAccessTokenSilently()
                    const userData: CreateUserRequest = {
                        auth0Id: user.sub,
                        email: user.email,
                    }
                    await dispatch(createUser({ accessToken, userData }))
                    hasCreatedUser.current = true
                } catch (error) {
                    console.error("Error creating user:", error)
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
