import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const PervPageNavButton = () => {
    const navigate = useNavigate()

    const handleReturnToPrevPage = () => {
        navigate(-1)
    }

    return (
        <div
            className="bg-slate-100 rounded-full w-12 h-12 flex items-center justify-center"
            onClick={handleReturnToPrevPage}
        >
            <ChevronLeft className="text-gray-600" />
        </div>
    )
}

export default PervPageNavButton