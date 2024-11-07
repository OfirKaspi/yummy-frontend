// App.tsx
import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch } from 'react-redux'
import AppRoutes from '@/AppRoutes'
import { getUser } from '@/store/user/userSlice'
import { AppDispatch } from '@/store/store'
import { setDarkMode } from './store/darkMode/darkModeSlice'

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

        const savedMode = localStorage.getItem('darkMode') === 'true'
        dispatch(setDarkMode(savedMode))
        document.documentElement.classList.toggle('dark', savedMode)

        initializeUser()
    }, [isAuthenticated, getAccessTokenSilently, dispatch])

    return <AppRoutes />
}

export default App
