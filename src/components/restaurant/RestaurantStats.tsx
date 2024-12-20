import { Clock, Truck } from "lucide-react"
import { Restaurant } from "@/types"

type Props = {
    restaurant: Restaurant
}

const RestaurantStats = ({ restaurant }: Props) => {
    return (
        <div className="flex items-center gap-2 text-sm">

            {/* Later add reviews for restaurants */}
            {/* <div className="flex gap-1 font-bold">
                    <Star size={20} className="text-orange-500" />
                    <span>4.7</span>
                </div> */}

            <div className="flex gap-1">
                <Clock size={20} className="text-orange-500" />
                <span className="text-gray-800 dark:text-gray-200">{restaurant.estimatedDeliveryTime} min</span>
            </div>
            <div className="flex gap-1">
                <Truck size={20} className="text-orange-500" />
                <span className="text-gray-800 dark:text-gray-200">Delivery ${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
            </div>
        </div>
    )
}

export default RestaurantStats