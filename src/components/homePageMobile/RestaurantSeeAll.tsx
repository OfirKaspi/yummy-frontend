import { useNavigate } from "react-router-dom"
import ExpandBtn from "@/components/ExpandBtn"

const RestaurantSeeAll = () => {
    const navigate = useNavigate()

    const handleSeeAll = () => {
        navigate('/search/london')
    }
    return (
        <div className="flex items-end justify-between md:justify-normal md:gap-2">
            <h2 className="text-xl">Open Restaurants</h2>
            <div className="md:underline" onClick={handleSeeAll}>
                <ExpandBtn />
            </div>
        </div>
    )
}

export default RestaurantSeeAll