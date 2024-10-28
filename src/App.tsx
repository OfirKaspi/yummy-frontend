// App.tsx
import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch } from 'react-redux'
import AppRoutes from '@/AppRoutes'
import { getUser } from '@/store/user/userSlice'
import { AppDispatch } from '@/store/store'

const App = () => {
    const dispatch: AppDispatch = useDispatch()
    const { isAuthenticated, getAccessTokenSilently } = useAuth0()

    useEffect(() => {
        const initializeUser = async () => {
            if (isAuthenticated) {
                try {
                    const accessToken = await getAccessTokenSilently()
                    dispatch(getUser(accessToken))
                } catch (error) {
                    console.error("Error getting user:", error)
                }
            }
        }

        initializeUser()
    }, [isAuthenticated, getAccessTokenSilently, dispatch])

    return <AppRoutes />
}

export default App
