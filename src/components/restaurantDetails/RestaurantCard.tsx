import { Restaurant } from "@/types"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { Dot } from "lucide-react"
import { useNavigate } from "react-router-dom"
import RestaurantStats from "@/components/RestaurantStats"

type Props = {
    restaurant: Restaurant
}

const RestaurantCard = ({ restaurant }: Props) => {
    const navigate = useNavigate()

    const sendToRestaurantDetails = () => {
        navigate(`/details/${restaurant._id}`)
    }

    return (
        <li className="flex flex-col gap-2 cursor-pointer" onClick={sendToRestaurantDetails}>
            <AspectRatio ratio={16 / 7}>
                <img src={restaurant.imageUrl} className="rounded-lg object-cover h-full w-full" />
            </AspectRatio>
            <div>
                <h3 className="text-xl hover:underline">{restaurant.restaurantName}</h3>
                <div className="flex">
                    {restaurant.cuisines.map((cuisine, index) => (
                        <span key={cuisine} className="flex text-gray-600 text-sm">
                            <span>{cuisine}</span>
                            {index < restaurant.cuisines.length - 1 && <Dot size={20} className="text-gray-600" />}
                        </span>
                    ))}
                </div>
            </div>
            <RestaurantStats restaurant={restaurant} />
        </li>
    )
}

export default RestaurantCard