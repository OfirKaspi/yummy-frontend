import { Restaurant } from "@/types"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { Clock, Dot, Star, Truck } from "lucide-react"

type Props = {
    restaurant: Restaurant
}

const RestaurantCardMobile = ({ restaurant }: Props) => {

    return (
        <div className="flex flex-col gap-3">
            <AspectRatio ratio={16 / 7}>
                <img src={restaurant.imageUrl} className="rounded-lg object-cover h-full w-full" />
            </AspectRatio>
            <div>
                <h3 className="text-xl">Restaurant Title</h3>
                <div className="flex">
                    {restaurant.cuisines.map((cuisine, index) => (
                        <span className="flex text-gray-600 text-sm">
                            <span>{cuisine}</span>
                            {index < restaurant.cuisines.length - 1 && <Dot size={20} className="text-gray-600" />}
                        </span>
                    ))}
                </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
                <div className="flex gap-1 font-bold">
                    <Star size={20} className="text-orange-600" />
                    {/* Later add reviews for restaurants */}
                    <span>4.7</span>
                </div>
                <div className="flex gap-1">
                    <Truck size={20} className="text-orange-600" />
                    <span>${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
                </div>
                <div className="flex gap-1">
                    <Clock size={20} className="text-orange-600" />
                    <span>{restaurant.estimatedDeliveryTime} min</span>
                </div>
            </div>
        </div>
    )
}

export default RestaurantCardMobile