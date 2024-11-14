import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useAuth0 } from "@auth0/auth0-react"
import { Restaurant } from "@/types"
import { updateUserFavoriteRestaurants } from "@/store/user/userSlice"
import { AppDispatch } from "@/store/store"
import RestaurantStats from "@/components/restaurant/RestaurantStats"
import RestaurantCardCuisines from "@/components/restaurant/RestaurantCardCuisines"
import FavoriteStar from "@/components/FavoriteStar"

type Props = {
    restaurant: Restaurant
}

const RestaurantDetailsDescription = ({ restaurant }: Props) => {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch();

    const { getAccessTokenSilently, isAuthenticated } = useAuth0()


    const handleFavoriteToggle = useCallback(async () => {
        if (isAuthenticated) {
            const accessToken = await getAccessTokenSilently()
            dispatch(updateUserFavoriteRestaurants({ accessToken, favoriteRestaurantId: restaurant._id }))
        } else {
            navigate('/login')
        }
    },
        [dispatch, getAccessTokenSilently, isAuthenticated, navigate, restaurant._id],
    )

    return (
        <div className="flex flex-col gap-2 md:max-w-[700px]">
            <div className="flex items-center gap-2 text-xl font-medium">
                <span>{restaurant.restaurantName}</span>
                <FavoriteStar onClick={handleFavoriteToggle} restaurantId={restaurant._id} />
            </div>
            <RestaurantStats restaurant={restaurant} />
            <RestaurantCardCuisines restaurant={restaurant} />
            <p className="text-muted-foreground text-sm">{restaurant.description}</p>
        </div>
    )
}

export default RestaurantDetailsDescription