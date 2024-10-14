import { Restaurant, RestaurantSearchResponse } from "@/types"
import { SearchState } from "./SearchPage"

import PaginationSelector from "@/components/PaginationSelector"
import SearchBar, { SearchForm } from "@/components/SearchBar"
import RestaurantCardMobile from "@/components/restaurantCard/RestaurantCardMobile"
import SearchResultsInfoMobile from "@/components/searchResultsInfo/SearchResultsInfoMobile"
import PervPageNavButton from "@/components/PervPageNavButton"

import SearchFilter from "@/components/searchPage/SearchFilter"

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

            <SearchBar
                searchQuery={searchState.searchQuery}
                onSubmit={setSearchQuery}
                placeHolder="Search by Cuisine or Restaurant Name"
                onReset={resetSearch}
            />

            {results.data.map((restaurant: Restaurant) => (
                <RestaurantCardMobile restaurant={restaurant} />
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