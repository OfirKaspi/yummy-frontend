import SearchBar from "@/components/searchBar/SearchBar"
import SearchResultsInfoMobile from "@/components/searchResultsInfo/SearchResultsInfoMobile"
import PervPageNavButton from "@/components/navigation/PervPageNavButton"

import SearchFilter from "@/components/searchPage/SearchFilter"
import RestaurantList from "@/components/homePageMobile/RestaurantList"
import PaginationSelector from "@/components/PaginationSelector"

const SearchPageMobile = () => {
    return (
        <div className="space-y-5">
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <PervPageNavButton />
                    <SearchResultsInfoMobile />
                </div>
                <SearchFilter />
            </div>
            <div className="pb-2">
                <SearchBar placeHolder="Search by Restaurant Name" />
            </div>
            <RestaurantList />
            <PaginationSelector />
        </div>
    )
}

export default SearchPageMobile