import { useNavigate } from "react-router-dom"
import { Restaurant } from "@/types"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import RestaurantStats from "@/components/restaurant/RestaurantStats"
import RestaurantCardCuisines from "@/components/restaurant/RestaurantCardCuisines"

type Props = {
    restaurant: Restaurant
    isColumn?: boolean
}

const RestaurantCard = ({ restaurant, isColumn = false }: Props) => {
    const navigate = useNavigate()

    const sendToRestaurantDetails = () => {
        navigate(`/details/${restaurant._id}`)
    }

    return (
        <li className={`grid ${isColumn ? 'grid-cols-1 gap-2' : 'grid-cols-[80px_1fr] gap-5'} cursor-pointer`} onClick={sendToRestaurantDetails}>
            <AspectRatio ratio={isColumn ? 16 / 7 : 1 / 1}>
                <img src={restaurant.imageUrl} className={`rounded-lg object-cover ${isColumn ? "h-full w-full" : 'h-20 w-20'}`} />
            </AspectRatio>
            <div className={`flex flex-col justify-center gap-1`}>
                <h3 className="text-lg hover:underline">{restaurant.restaurantName}</h3>
                <RestaurantCardCuisines restaurant={restaurant} />
                <RestaurantStats restaurant={restaurant} />
            </div>
        </li >
    )
}

export default RestaurantCard