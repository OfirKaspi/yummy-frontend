import { ChevronLeft, LucideHeart } from "lucide-react"
import { useNavigate } from "react-router-dom"

type Props = {
    restaurantImg: string
}

const RestaurantDetailsNavMobile = ({ restaurantImg }: Props) => {
    const navigate = useNavigate()

    const handleReturnToPrevPage = () => {
        navigate(-1)
    }

    return (
        <div
            className="flex justify-between -mt-5 -mx-5 p-5 h-80 rounded-b-3xl bg-cover bg-center"
            style={{ backgroundImage: `url(${restaurantImg})` }}
        >
            <div
                className="bg-slate-100 rounded-full w-12 h-12 flex items-center justify-center"
                onClick={handleReturnToPrevPage}
            >
                <ChevronLeft className="text-gray-600" />
            </div>
            <div className="bg-slate-100 rounded-full w-12 h-12 flex items-center justify-center">
                <LucideHeart className="text-gray-600" />
            </div>
        </div>
    )
}

export default RestaurantDetailsNavMobile