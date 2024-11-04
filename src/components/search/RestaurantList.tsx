import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import RestaurantCard from "@/components/restaurantDetails/RestaurantCard"
import { SkeletonCard } from "@/components/ui/skeleton"
import { AppDispatch } from "@/store/store"
import { getRestaurantsStore } from "@/store/restaurants/restaurantsSlice"
import { selectError, selectLoading, selectRestaurants } from "@/store/restaurants/restaurantsSelectors"
import { selectSearchState } from "@/store/search/searchSlice"
import NotFound from "@/components/NotFound"
import SeeAll from "@/components/SeeAll"

const RestaurantList = () => {
    const { city } = useParams()
    const dispatch: AppDispatch = useDispatch()
    const searchState = useSelector(selectSearchState)
    const restaurants = useSelector(selectRestaurants)
    const isLoading = useSelector(selectLoading)
    const isError = useSelector(selectError)

    const navigate = useNavigate()
    const handleSeeAll = () => {
        navigate('/search/london')
    }

    useEffect(() => {
        if (city) {
            dispatch(getRestaurantsStore({ searchState, city }))
        } else {
            dispatch(getRestaurantsStore({ searchState, city: "london" }))
        }
    }, [dispatch, searchState, city])


    if (isLoading) {
        return (
            <div className="max-w-[500px]">
                <SkeletonCard />
            </div>
        )
    }

    if (!restaurants || isError) {
        return <NotFound itemNotFound="restaurants" />
    }

    return (
        <div className="space-y-5">
            {!city && <SeeAll handleOnClick={handleSeeAll} text="Restaurants near by" />}
            <ul className="
                grid gap-5 grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                2xl:grid-cols-4
            ">
                {restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                ))}
            </ul>
        </div>
    )
}

export default RestaurantList