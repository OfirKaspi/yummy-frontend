import { useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useCreateMyUser } from "@/api/MyUserApi"
import { useAuth0 } from "@auth0/auth0-react"

import Loader from "@/components/Loader"

const AuthCallbackPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useAuth0()
    const { createUser } = useCreateMyUser()

    const hasCreatedUser = useRef(false)

    useEffect(() => {
        const returnTo = location.state?.returnTo || "/"

        if (user?.sub && user?.email && !hasCreatedUser.current) {
            createUser({
                auth0Id: user.sub,
                email: user.email
            })
            hasCreatedUser.current = true
        }

        navigate(returnTo)
    }, [createUser, navigate, user, location])


    return (
        <Loader isFullScreen />
    )
}

export default AuthCallbackPage