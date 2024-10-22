import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import ExpandBtn from "@/components/ExpandBtn"
import RestaurantCardMobile from "@/components/restaurantCard/RestaurantCardMobile"
import { SkeletonCard } from "@/components/ui/skeleton"
import { AppDispatch } from "@/store/store"
import { fetchRestaurants, selectError, selectLoading, selectRestaurants } from "@/store/restaurantsSlice"
import { selectSearchState } from "@/store/searchSlice"

const RestaurantList = () => {
    const navigate = useNavigate()
    const city = "London"

    const dispatch: AppDispatch = useDispatch()
    const searchState = useSelector(selectSearchState)
    const restaurants = useSelector(selectRestaurants)
    const isLoading = useSelector(selectLoading)
    const isError = useSelector(selectError)

    useEffect(() => {
        dispatch(fetchRestaurants({ searchState, city }))
    }, [dispatch, searchState])

    const handleSeeAll = () => {
        navigate('/search/london')
    }

    if (isLoading) {
        return <SkeletonCard />
    }

    if (!restaurants || isError) {
        return <span>No results found</span>
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h2 className="text-xl">Open Restaurants</h2>
                <div onClick={handleSeeAll}>
                    <ExpandBtn />
                </div>
            </div>
            {isLoading}
            <div className="space-y-5">
                {restaurants.map((restaurant) => (
                    <RestaurantCardMobile key={restaurant._id} restaurant={restaurant} />
                ))}
            </div>
        </div>
    )
}

export default RestaurantList