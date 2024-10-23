import useDeviceType from "@/hooks/useDeviceType"
import SearchPageDesktop from "@/pages/searchPage/SearchPageDesktop"
import SearchPageMobile from "@/pages/searchPage/SearchPageMobile"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "@/store/store"
import { selectSearchState } from "@/store/search/searchSlice"
import { getRestaurantsStore } from "@/store/restaurants/restaurantsSlice"
import { useEffect } from "react"

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


    return isMobile
        ? <SearchPageMobile />
        : <SearchPageDesktop />
}

export default SearchPage