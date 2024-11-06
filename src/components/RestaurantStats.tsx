import { Restaurant } from "@/types"
import { Clock, Truck } from "lucide-react"

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
                <span>{restaurant.estimatedDeliveryTime} min</span>
            </div>
            <div className="flex gap-1">
                <Truck size={20} className="text-orange-500" />
                <span>Delivery ${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
            </div>
        </div>
    )
}

export default RestaurantStats