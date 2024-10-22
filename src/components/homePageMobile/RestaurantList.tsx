import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import RestaurantCardMobile from "@/components/restaurantCard/RestaurantCardMobile"
import { SkeletonCard } from "@/components/ui/skeleton"
import { AppDispatch } from "@/store/store"
import { fetchRestaurants, selectError, selectLoading, selectRestaurants } from "@/store/restaurantsSlice"
import { selectSearchState } from "@/store/searchSlice"
import NotFound from "@/components/NotFound"
import RestaurantSeeAll from "@/components/homePageMobile/RestaurantSeeAll"

const RestaurantList = () => {
    const { city } = useParams()
    const dispatch: AppDispatch = useDispatch()
    const searchState = useSelector(selectSearchState)
    const restaurants = useSelector(selectRestaurants)
    const isLoading = useSelector(selectLoading)
    const isError = useSelector(selectError)

    useEffect(() => {
        if (city) {
            dispatch(fetchRestaurants({ searchState, city }))
        } else {
            dispatch(fetchRestaurants({ searchState, city: "london" }))
        }
    }, [dispatch, searchState, city])


    if (isLoading) {
        return <SkeletonCard />
    }

    if (!restaurants || isError) {
        return <NotFound itemNotFound="restaurants" />
    }

    return (
        <div className="space-y-5">
            {!city && <RestaurantSeeAll />}
            {restaurants.map((restaurant) => (
                <RestaurantCardMobile key={restaurant._id} restaurant={restaurant} />
            ))}
        </div>
    )
}

export default RestaurantList