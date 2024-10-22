import CuisineFilter from "@/components/cuisineFilter/CuisineFilter"
import PaginationSelector from "@/components/PaginationSelector"
import SearchBar from "@/components/searchBar/SearchBar"
import SearchResultsInfoDesktop from "@/components/searchResultsInfo/SearchResultsInfoDesktop"
import SortOptionDropdown from "@/components/SortOptionDropdown"
import RestaurantList from "@/components/homePageMobile/RestaurantList"


const SearchPageDesktop = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                <CuisineFilter />
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar placeHolder="Search by Cuisine or Restaurant Name" />
                <div className="flex justify-between flex-col gap-3 lg:flex-row">
                    <SearchResultsInfoDesktop />
                    <SortOptionDropdown />
                </div>
                <RestaurantList />
                <PaginationSelector />
            </div>
        </div>
    )
}

export default SearchPageDesktop