import { selectFavoriteRestaurants, selectUserLoading } from "@/store/user/userSelectors"
import { Separator } from "@/components/ui/separator"
import { useSelector } from "react-redux"
import NotFound from "@/components/NotFound"
import { Dot } from "lucide-react"
import RestaurantStats from "@/components/RestaurantStats"
import { useNavigate } from "react-router-dom"
import { SkeletonCard } from "@/components/ui/skeleton"

const MyFavoritesPage = () => {
    const favorites = useSelector(selectFavoriteRestaurants)
    const isLoading = useSelector(selectUserLoading)
    const navigate = useNavigate()

    if (isLoading) {
        return <SkeletonCard />
    }

    if ((!favorites || favorites.length === 0) && !isLoading) {
        return (
            <div className="space-y-5">
                <Separator />
                <NotFound itemNotFound="Favorites" />
            </div>
        )
    }

    const navigateToDetailsPage = (restaurantId: string) => {
        navigate(`/details/${restaurantId}`)
    }

    return (
        <div className="space-y-5">
            {favorites.map((restaurant) => {
                const spliceNum = restaurant.cuisines.length > 2 ? 3 : restaurant.cuisines.length;
                return (
                    <div key={restaurant._id} className="space-y-5">
                        <Separator />
                        <div
                            onClick={() => navigateToDetailsPage(restaurant._id)}
                            className="cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={restaurant.imageUrl}
                                    alt={restaurant.restaurantName}
                                    className="object-cover w-20 h-20 rounded-xl"
                                />
                                <div className="flex-1">
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-lg hover:underline">{restaurant.restaurantName}</h3>
                                        <div className="flex">
                                            {restaurant.cuisines.slice(0, spliceNum).map((cuisine, index) => (
                                                <span key={cuisine} className="flex text-gray-600 text-sm">
                                                    <span>{cuisine}</span>
                                                    {index < spliceNum - 1 && (
                                                        <Dot size={20} className="text-gray-600" />
                                                    )}
                                                </span>
                                            ))}
                                        </div>
                                        <RestaurantStats restaurant={restaurant} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}


export default MyFavoritesPage
