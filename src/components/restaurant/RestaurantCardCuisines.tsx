import { Dot } from "lucide-react"
import { Restaurant } from "@/types"

type Props = {
    restaurant: Restaurant
}

const RestaurantCardCuisines = ({ restaurant }: Props) => {
    const visibleCuisines = restaurant.cuisines.slice(0, 2);
    const hasMore = restaurant.cuisines.length > 2

    return (
        <>
            <h3 className="text-lg hover:underline">{restaurant.restaurantName}</h3>
            <div className="flex items-center text-gray-800 dark:text-gray-200 text-sm">
                {visibleCuisines.map((cuisine, index) => (
                    <span key={cuisine} className="flex items-center">
                        {cuisine}
                        {index < visibleCuisines.length - 1 && (
                            <Dot size={20} className="text-gray-800 dark:text-gray-200" />
                        )}
                    </span>
                ))}
                {hasMore && (<>
                    <Dot size={20} className="text-gray-800 dark:text-gray-200" />
                    <span>And more...</span>
                </>)}
            </div>
        </>
    )
}

export default RestaurantCardCuisines