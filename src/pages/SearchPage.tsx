import { useParams } from "react-router-dom"

import { useSearchRestaurant } from "@/api/RestaurantApi"

const SearchPage = () => {
    const { city } = useParams()
    const { results } = useSearchRestaurant(city)

    return (
        <div>
            User searched for {city}{" "}
            <span>
                {results?.data.map((restaurant) => (
                    <span>
                        found - {restaurant.restaurantName}, {restaurant.city}
                    </span>
                ))}
            </span>
        </div>
    )
}

export default SearchPage