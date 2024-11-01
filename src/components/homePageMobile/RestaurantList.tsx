import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import RestaurantCardMobile from "@/components/restaurantCard/RestaurantCardMobile"
import { SkeletonCard } from "@/components/ui/skeleton"
import { AppDispatch } from "@/store/store"
import { getRestaurantsStore } from "@/store/restaurants/restaurantsSlice"
import { selectError, selectLoading, selectRestaurants } from "@/store/restaurants/restaurantsSelectors"
import { selectSearchState } from "@/store/search/searchSlice"
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
            dispatch(getRestaurantsStore({ searchState, city }))
        } else {
            dispatch(getRestaurantsStore({ searchState, city: "london" }))
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
            <ul className="
                grid gap-5 grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
            ">
                {restaurants.map((restaurant) => (
                    <RestaurantCardMobile key={restaurant._id} restaurant={restaurant} />
                ))}
            </ul>
        </div>
    )
}

export default RestaurantList