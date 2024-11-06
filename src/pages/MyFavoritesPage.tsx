import { useSelector } from "react-redux"
import { selectFavoriteRestaurants, selectUserLoading } from "@/store/user/userSelectors"
import useDeviceType from "@/hooks/useDeviceType"
import { Separator } from "@/components/ui/separator"
import NotFound from "@/components/NotFound"
import { SkeletonCard } from "@/components/ui/skeleton"
import RestaurantCard from "@/components/restaurantDetails/RestaurantCard"

const MyFavoritesPage = () => {
    const { isMobile } = useDeviceType()
    const favoritesRestaurants = useSelector(selectFavoriteRestaurants)
    const isLoading = useSelector(selectUserLoading)

    if (isLoading) {
        return <SkeletonCard />
    }

    if ((!favoritesRestaurants || favoritesRestaurants.length === 0) && !isLoading) {
        return (
            <div className="space-y-5">
                <Separator />
                <NotFound itemNotFound="Favorites" />
            </div>
        )
    }

    return (
        <div className="space-y-5">
            <Separator />
            <ul className='grid gap-5 md:grid-cols-3 lg:grid-cols-4'>
                {favoritesRestaurants.map((restaurant) => (
                    <RestaurantCard isColumn={isMobile ? false : true} key={restaurant._id} restaurant={restaurant} />
                ))}
            </ul>
        </div>
    )
}


export default MyFavoritesPage
