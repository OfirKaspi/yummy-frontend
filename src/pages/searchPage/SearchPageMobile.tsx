import { Restaurant, RestaurantSearchResponse, SortOptionValue, SearchState } from "@/types"

import PaginationSelector from "@/components/PaginationSelector"
import SearchBar, { SearchForm } from "@/components/searchBar/SearchBar"
import RestaurantCardMobile from "@/components/restaurantCard/RestaurantCardMobile"
import SearchResultsInfoMobile from "@/components/searchResultsInfo/SearchResultsInfoMobile"
import PervPageNavButton from "@/components/navigation/PervPageNavButton"

import SearchFilter from "@/components/searchPage/SearchFilter"

type Props = {
    city: string
    searchState: SearchState
    results: RestaurantSearchResponse
    setSortOption: (sortOption: SortOptionValue) => void
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
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <PervPageNavButton />
                    <SearchResultsInfoMobile total={results.pagination.total} city={city} />
                </div>
                <SearchFilter
                    setSelectedCuisines={setSelectedCuisines}
                    searchState={searchState}
                    setSortOption={setSortOption}
                />
            </div>
            <div className="pb-2">
                <SearchBar
                    searchQuery={searchState.searchQuery}
                    onSubmit={setSearchQuery}
                    placeHolder="Search by Restaurant Name"
                    onReset={resetSearch}
                />
            </div>

            {results.data.map((restaurant: Restaurant) => (
                <RestaurantCardMobile key={restaurant._id} restaurant={restaurant} />
            ))}
            <PaginationSelector
                page={results.pagination.page}
                pages={results.pagination.pages}
                onPageChange={setPage}
            />
        </div>
    )
}

export default SearchPageMobile