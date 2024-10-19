import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { SearchForm } from "@/components/searchBar/SearchBar"
import { useSearchRestaurant } from "@/api/RestaurantApi"
import useDeviceType from "@/hooks/useDeviceType"

import Loader from "@/components/Loader"
import SearchPageDesktop from "./SearchPageDesktop"
import SearchPageMobile from "./SearchPageMobile"

export type SearchState = {
    searchQuery: string
    page: number
    selectedCuisines: string[]
    sortOption: string
}

const SearchPage = () => {
    const { isDesktop, isMobile } = useDeviceType()
    const { city } = useParams()
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedCuisines: [],
        sortOption: "bestMatch"
    })

    const [showLoader, setShowLoader] = useState<boolean>(true)
    const { results, isLoading } = useSearchRestaurant(searchState, city)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false)
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    const setSortOption = (sortOption: string) => {
        setSearchState((prevState) => ({
            ...prevState,
            sortOption,
            page: 1,
        }))
    }

    const setSelectedCuisines = (selectedCuisines: string[]) => {
        setSearchState((prevState) => ({
            ...prevState,
            selectedCuisines,
            page: 1,
        }))
    }

    const setPage = (page: number) => {
        setSearchState((prevState) => ({
            ...prevState,
            page,
        }))
    }

    const setSearchQuery = (searchFormData: SearchForm) => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery,
            page: 1,
        }))
    }

    const resetSearch = () => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: "",
            page: 1,
        }))
    }


    if (isLoading || showLoader) {
        return <Loader isFullScreen />
    }

    if (!results?.data || !city) {
        return <span>No results found</span>
    }

    return (
        <>
            {isMobile &&
                <SearchPageMobile
                    city={city}
                    searchState={searchState}
                    results={results}
                    setSortOption={setSortOption}
                    setSelectedCuisines={setSelectedCuisines}
                    setPage={setPage}
                    setSearchQuery={setSearchQuery}
                    resetSearch={resetSearch}
                />
            }

            {isDesktop &&
                <SearchPageDesktop
                    city={city}
                    searchState={searchState}
                    results={results}
                    setSortOption={setSortOption}
                    setSelectedCuisines={setSelectedCuisines}
                    setPage={setPage}
                    setSearchQuery={setSearchQuery}
                    resetSearch={resetSearch}
                />
            }
        </>
    )
}

export default SearchPage