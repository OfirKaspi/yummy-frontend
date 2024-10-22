import { useNavigate } from "react-router-dom"
import ExpandBtn from "@/components/ExpandBtn"

const RestaurantSeeAll = () => {
    const navigate = useNavigate()

    const handleSeeAll = () => {
        navigate('/search/london')
    }
    return (
        <div className="flex items-center justify-between">
            <h2 className="text-xl">Open Restaurants</h2>
            <div onClick={handleSeeAll}>
                <ExpandBtn />
            </div>
        </div>
    )
}

export default RestaurantSeeAll