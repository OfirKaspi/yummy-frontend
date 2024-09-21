import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Restaurant } from "@/types"
import { useSearchRestaurant } from "@/api/RestaurantApi"
import SearchResultsInfo from "@/components/SearchResultsInfo"
import SearchResultsCard from "@/components/SearchResultsCard"
import SearchBar, { SearchForm } from "@/components/SearchBar"
import Loader from "@/components/ui/Loader"
import PaginationSelector from "@/components/PaginationSelector"
import CuisineFilter from "@/components/CuisineFilter"
import SortOptionDropdown from "@/components/SortOptionDropdown"

export type SearchState = {
    searchQuery: string
    page: number
    selectedCuisines: string[]
    sortOption: string
}

const SearchPage = () => {
    const { city } = useParams()
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedCuisines: [],
        sortOption: "bestMatch"
    })

    const [isExpanded, setIsExpanded] = useState<boolean>(false)
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
        return <Loader />
    }

    if (!results?.data || !city) {
        return <span>No results found</span>
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                <CuisineFilter
                    isExpanded={isExpanded}
                    onExpandedClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
                    onChange={setSelectedCuisines}
                    selectedCuisines={searchState.selectedCuisines}
                />
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar
                    searchQuery={searchState.searchQuery}
                    onSubmit={setSearchQuery}
                    placeHolder="Search by Cuisine or Restaurant Name"
                    onReset={resetSearch}
                />
                <div className="flex justify-between flex-col gap-3 lg:flex-row">
                    <SearchResultsInfo total={results.pagination.total} city={city} />
                    <SortOptionDropdown sortOption={searchState.sortOption} onChange={(value) => setSortOption(value)} />
                </div>
                {results.data.map((restaurant: Restaurant) => (
                    <SearchResultsCard restaurant={restaurant} />
                ))}
                <PaginationSelector
                    page={results.pagination.page}
                    pages={results.pagination.pages}
                    onPageChange={setPage}
                />
            </div>
        </div>
    )
}

export default SearchPage