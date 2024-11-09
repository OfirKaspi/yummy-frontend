import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "@/store/store"
import { selectSearchState } from "@/store/search/searchSlice"
import { getRestaurantsStore } from "@/store/restaurants/restaurantsSlice"
import useDeviceType from "@/hooks/useDeviceType"
import RestaurantSearch from "@/components/search/RestaurantSearch"
import RestaurantList from "@/components/search/RestaurantList"
import PaginationSelector from "@/components/PaginationSelector"
import CuisineFilter from "@/components/search/CuisineFilter"
import SortOptionDropdown from "@/components/SortOptionDropdown"
import { Separator } from "@/components/ui/separator"

const SearchPage = () => {
    const { isMobile } = useDeviceType()

    const { city } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const searchState = useSelector(selectSearchState)

    useEffect(() => {
        if (city) {
            dispatch(getRestaurantsStore({ searchState, city }))
        }
    }, [city, dispatch, searchState])


    return (
        <div className="relative md:grid md:grid-cols-[270px_1fr] lg:grid-cols-[320px_1fr] md:gap-5">
            {!isMobile && (
                <div className="sticky top-0 space-y-5">
                    <div className="space-y-5 border-2 p-5 rounded-lg">
                        <SortOptionDropdown />
                    </div>
                    <div className="space-y-5 border-2 p-5 rounded-lg sticky">
                        <h3 className="text-xl">Filter By</h3>
                        <Separator />
                        <CuisineFilter />
                    </div>
                </div>
            )}
            <div className="space-y-5">
                <div className="pb-2">
                    <RestaurantSearch placeHolder="Search by restaurant..." />
                </div>
                <Separator />
                <RestaurantList />
                <PaginationSelector />
            </div>
        </div>
    )
}

export default SearchPage