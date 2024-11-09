import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDarkMode, setDarkMode } from '@/store/darkMode/darkModeSlice'
import { selectIsDarkMode } from '@/store/darkMode/darkModeSelectors'
import { Switch } from '@/components/ui/switch'

const DarkModeToggle = () => {
    const isDarkMode = useSelector(selectIsDarkMode)
    const dispatch = useDispatch()

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode') === 'true'
        dispatch(setDarkMode(savedMode))
        document.documentElement.classList.toggle('dark', savedMode)
    }, [dispatch])

    const handleToggle = () => {
        dispatch(toggleDarkMode())
        const newMode = !isDarkMode
        localStorage.setItem('darkMode', newMode.toString())
        document.documentElement.classList.toggle('dark', newMode)
    }

    return (
        <div className="flex items-center gap-2">
            <span className="text-gray-800 dark:text-gray-200">Light</span>
            <Switch checked={isDarkMode} onCheckedChange={handleToggle} />
            <span className="text-gray-800 dark:text-gray-200">Dark</span>
        </div>
    )
}

export default DarkModeToggle
