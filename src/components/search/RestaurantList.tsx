import { useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import RestaurantCard from "@/components/restaurant/RestaurantCard"
import { Skeleton, SkeletonCard } from "@/components/ui/skeleton"
import { AppDispatch } from "@/store/store"
import { getRestaurantsStore } from "@/store/restaurants/restaurantsSlice"
import { selectError, selectLoading, selectRestaurants } from "@/store/restaurants/restaurantsSelectors"
import { selectSearchState } from "@/store/search/searchSlice"
import NotFound from "@/components/NotFound"
import SeeAll from "@/components/SeeAll"
import useDeviceType from "@/hooks/useDeviceType"

const RestaurantList = () => {
    const { city = "Tel Aviv" } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const { isMobile } = useDeviceType()
    const isHomePage = location.pathname === '/'
    const dispatch = useDispatch<AppDispatch>()

    const searchState = useSelector(selectSearchState)
    const restaurants = useSelector(selectRestaurants)
    const isLoading = useSelector(selectLoading)
    const isError = useSelector(selectError)

    const handleSeeAll = useCallback(() => navigate('/search/Tel Aviv'), [navigate])

    useEffect(() => {
        dispatch(getRestaurantsStore({ searchState, city }))
    }, [dispatch, searchState, city])

    if (isLoading) {
        return (
            <section className="space-y-5">
                {isHomePage && <Skeleton className="h-6 w-[16rem]" />}
                <ul className={`grid gap-5 grid-cols-1 sm:grid-cols-2 ${isHomePage ? "md:grid-cols-3" : "lg:grid-cols-3"}`}>
                    {[...Array(isMobile ? 1 : 3)].map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </ul>
            </section>
        )
    }

    if (isError || !restaurants?.length) {
        return <NotFound itemNotFound="restaurants" />
    }

    return (
        <section className="space-y-5">
            {isHomePage && <SeeAll handleOnClick={handleSeeAll} text="Restaurants nearby" />}
            <ul className={`grid gap-5 grid-cols-1 sm:grid-cols-2 ${isHomePage ? "md:grid-cols-3" : "lg:grid-cols-3"}`}>
                {restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant._id} isColumn={isMobile ? false : true} restaurant={restaurant} />
                ))}
            </ul>
        </section>
    )
}

export default RestaurantList
