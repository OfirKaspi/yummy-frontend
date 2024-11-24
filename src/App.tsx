// App.tsx
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectIsDarkMode } from '@/store/darkMode/darkModeSelectors'
import AppRoutes from '@/AppRoutes'

const App = () => {
    const isDarkMode = useSelector(selectIsDarkMode)

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode)
    }, [isDarkMode])

    return <AppRoutes />
}

export default App
