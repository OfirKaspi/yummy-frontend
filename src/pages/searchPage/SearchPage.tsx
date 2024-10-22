import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { SearchForm } from "@/components/searchBar/SearchBar"
import useDeviceType from "@/hooks/useDeviceType"

import Loader from "@/components/Loader"
import SearchPageDesktop from "@/pages/searchPage/SearchPageDesktop"
import SearchPageMobile from "@/pages/searchPage/SearchPageMobile"
import { SortOptionValue } from "@/types"
import { resetSearch, selectSearchState, setPage, setSearchQuery, setSelectedCuisines, setSortOption } from "@/store/searchSlice"
import { fetchRestaurants, selectLoading, selectPagination, selectRestaurants } from "@/store/restaurantsSlice"
import { AppDispatch } from "@/store/store"

const SearchPage = () => {
    const { isDesktop, isMobile } = useDeviceType()
    const { city } = useParams()

    const dispatch = useDispatch<AppDispatch>()
    const searchState = useSelector(selectSearchState)
    const restaurants = useSelector(selectRestaurants)
    const pagination = useSelector(selectPagination)
    const isLoading = useSelector(selectLoading)

    useEffect(() => {
        if (city) {
            dispatch(fetchRestaurants({ searchState, city }))
        }
    }, [city, dispatch, searchState])

    const handleSetSortOption = (sortOption: SortOptionValue) => {
        dispatch(setSortOption(sortOption))
    }

    const handleSetSelectedCuisines = (selectedCuisines: string[]) => {
        dispatch(setSelectedCuisines(selectedCuisines))
    }

    const handleSetPage = (page: number) => {
        dispatch(setPage(page))
    }

    const handleSetSearchQuery = (searchFormData: SearchForm) => {
        dispatch(setSearchQuery(searchFormData.searchQuery))
    }

    const handleResetSearch = () => {
        dispatch(resetSearch())
    }

    if (isLoading) {
        return <Loader isFullScreen />
    }

    if (!pagination || !restaurants || !city) {
        return <span>No results found</span>
    }

    return (
        <>
            {isMobile &&
                <SearchPageMobile
                    searchState={searchState}
                    results={{ data: restaurants, pagination: pagination }}
                    setSortOption={handleSetSortOption}
                    setSelectedCuisines={handleSetSelectedCuisines}
                    setPage={handleSetPage}
                    setSearchQuery={handleSetSearchQuery}
                    resetSearch={handleResetSearch}
                />
            }

            {isDesktop &&
                <SearchPageDesktop
                    city={city}
                    searchState={searchState}
                    results={{ data: restaurants, pagination: pagination }}
                    setSortOption={handleSetSortOption}
                    setSelectedCuisines={handleSetSelectedCuisines}
                    setPage={handleSetPage}
                    setSearchQuery={handleSetSearchQuery}
                    resetSearch={handleResetSearch}
                />
            }
        </>
    )
}

export default SearchPage