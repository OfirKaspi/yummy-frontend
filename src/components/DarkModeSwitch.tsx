import { useSelector, useDispatch } from 'react-redux'
import { toggleDarkMode } from '@/store/darkMode/darkModeSlice'
import { selectIsDarkMode } from '@/store/darkMode/darkModeSelectors'
import { Switch } from '@/components/ui/switch'

const DarkModeToggle = () => {
    const isDarkMode = useSelector(selectIsDarkMode)
    const dispatch = useDispatch()

    const handleToggle = () => {
        dispatch(toggleDarkMode())
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
