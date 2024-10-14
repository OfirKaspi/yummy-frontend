import CuisineFilter from "@/components/cuisineFilter/CuisineFilter"
import PaginationSelector from "@/components/PaginationSelector"
import SearchBar, { SearchForm } from "@/components/SearchBar"
import SearchResultsInfo from "@/components/SearchResultsInfo"
import SortOptionDropdown from "@/components/SortOptionDropdown"
import { Restaurant, RestaurantSearchResponse } from "@/types"
import { SearchState } from "./SearchPage"
import RestaurantCard from "@/components/restaurantCard/RestaurantCard"

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

const SearchPageDesktop = ({
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
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
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
                    <SearchResultsInfo total={results.pagination.total} city={city} />
                    <SortOptionDropdown sortOption={searchState.sortOption} onChange={(value) => setSortOption(value)} />
                </div>
                {results.data.map((restaurant: Restaurant) => (
                    <RestaurantCard restaurant={restaurant} />
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

export default SearchPageDesktop