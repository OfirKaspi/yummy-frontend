import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useSearchRestaurant } from "@/api/RestaurantApi"

import { SearchState } from "@/pages/searchPage/SearchPage"
import ExpandBtn from "./ExpandBtn"
import RestaurantCardMobile from "../restaurantCard/RestaurantCardMobile"
import { SkeletonCard } from "../ui/skeleton"

const RestaurantList = () => {
    const navigate = useNavigate()
    const city = 'london' //Change later to something else - not hardcoded
    const [searchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedCuisines: [],
        sortOption: "bestMatch"
    })

    const { results, isLoading } = useSearchRestaurant(searchState, city)


    const handleSeeAll = () => {
        navigate('/search/london')
    }


    if (isLoading) {
        return <SkeletonCard />
    }

    if (!results?.data || !city) {
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
                {results.data.map((restaurant) => (
                    <RestaurantCardMobile restaurant={restaurant} />
                ))}
            </div>
        </div>
    )
}

export default RestaurantList