import { Restaurant } from "@/types"
import RestaurantStats from "@/components/RestaurantStats"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { StarIcon, StarFilledIcon } from "@radix-ui/react-icons"
import { useDispatch, useSelector } from "react-redux"
import { selectFavoriteRestaurants } from "@/store/user/userSelectors"
import { AppDispatch } from "@/store/store"
import { updateUserFavoriteRestaurants } from "@/store/user/userSlice"
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"

type Props = {
    restaurant: Restaurant
}

const RestaurantDetailsDescription = ({ restaurant }: Props) => {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch();
    const favoriteRestaurants = useSelector(selectFavoriteRestaurants);
    const { getAccessTokenSilently, isAuthenticated } = useAuth0()

    const [isFavorite, setIsFavorite] = useState(
        favoriteRestaurants.some((favResId) => favResId._id === restaurant._id)
    )

    const handleFavoriteToggle = useCallback(async () => {
        if (isAuthenticated) {
            const accessToken = await getAccessTokenSilently()
            setIsFavorite((prev) => !prev)
            dispatch(updateUserFavoriteRestaurants({ accessToken, favoriteRestaurantId: restaurant._id }))
        } else {
            navigate('/login')
        }
    },
        [dispatch, getAccessTokenSilently, isAuthenticated, navigate, restaurant._id],
    )

    useEffect(() => {
        setIsFavorite(favoriteRestaurants.some((favResId) => favResId._id === restaurant._id));
    }, [favoriteRestaurants, restaurant._id])

    return (
        <div className="flex flex-col gap-2 md:max-w-[700px]">
            <RestaurantStats restaurant={restaurant} />
            <div className="flex items-center gap-2 text-xl font-medium">
                <span>{restaurant.restaurantName}</span>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            {
                                isFavorite
                                    ? <StarFilledIcon onClick={handleFavoriteToggle} className="text-orange-500 size-5" />
                                    : <StarIcon onClick={handleFavoriteToggle} className="text-orange-500 size-5" />
                            }
                        </TooltipTrigger>
                        <TooltipContent>
                            {
                                isFavorite
                                    ? <p>Remove from favorites</p>
                                    : <p>Add to favorites</p>
                            }
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <p className="text-gray-600 text-sm">
                At {restaurant.restaurantName}, enjoy a vibrant dining experience with a diverse
                menu featuring fresh ingredients and creative dishes.
                Whether you’re here for a casual lunch or a special dinner,
                our welcoming atmosphere and attentive service make every meal memorable.
            </p>
        </div>
    )
}

export default RestaurantDetailsDescription