import { Restaurant } from "@/types"
import RestaurantStats from "../RestaurantStats"

type Props = {
    restaurant: Restaurant
}

const RestaurantDetailsDescriptionMobile = ({ restaurant }: Props) => {
    return (
        <div className="flex flex-col gap-2">
            <RestaurantStats restaurant={restaurant} />
            <span className="text-xl font-medium">{restaurant.restaurantName}</span>
            <p className="text-gray-600 text-sm">
                At {restaurant.restaurantName}, enjoy a vibrant dining experience with a diverse
                menu featuring fresh ingredients and creative dishes.
                Whether you’re here for a casual lunch or a special dinner,
                our welcoming atmosphere and attentive service make every meal memorable.
            </p>
        </div>
    )
}

export default RestaurantDetailsDescriptionMobile