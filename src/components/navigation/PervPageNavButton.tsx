import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const PervPageNavButton = () => {
    const navigate = useNavigate()

    const handleReturnToPrevPage = () => {
        if (window.history.length > 1) {
            navigate(-1)
        } else {
            navigate('/')
        }
    }

    return (
        <div
            className="bg-slate-100 dark:bg-gray-500 rounded-full w-12 h-12 flex items-center justify-center"
            onClick={handleReturnToPrevPage}
        >
            <ChevronLeft className="text-gray-800 dark:text-gray-200" />
        </div>
    )
}

export default PervPageNavButton