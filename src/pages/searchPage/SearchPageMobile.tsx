import { Restaurant, RestaurantSearchResponse } from "@/types"
import { SearchState } from "./SearchPage"

import PaginationSelector from "@/components/PaginationSelector"
import SearchBar, { SearchForm } from "@/components/SearchBar"
import SortOptionDropdown from "@/components/SortOptionDropdown"
import CuisineFilter from "@/components/cuisineFilter/CuisineFilter"
import RestaurantCardMobile from "@/components/restaurantCard/RestaurantCardMobile"
import SearchResultsInfoMobile from "@/components/searchResultsInfo/SearchResultsInfoMobile"

type Props = {
    city: string
    searchState: SearchState
    results: RestaurantSearchResponse
    setSortOption: (sortOption: string) => void
    setSelectedCuisines: (selectedCuisines: string[]) => void
    setPage: (page: number) => void
    setSearchQuery: (searchFormData: SearchForm) => void
    resetSearch: () => void
}

const SearchPageMobile = ({
    city,
    searchState,
    results,
    setSortOption,
    setSelectedCuisines,
    setPage,
    setSearchQuery,
    resetSearch,
}: Props) => {
    return (
        <div className="space-y-5">
            <div id="cuisines-list">
                <CuisineFilter
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
                    <SearchResultsInfoMobile total={results.pagination.total} city={city} />
                    <SortOptionDropdown sortOption={searchState.sortOption} onChange={(value) => setSortOption(value)} />
                </div>
                {results.data.map((restaurant: Restaurant) => (
                    <RestaurantCardMobile restaurant={restaurant} />
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

export default SearchPageMobile