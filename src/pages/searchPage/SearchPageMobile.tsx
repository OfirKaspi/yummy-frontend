import SearchBar from "@/components/searchBar/SearchBar"
import RestaurantList from "@/components/homePageMobile/RestaurantList"
import PaginationSelector from "@/components/PaginationSelector"

const SearchPageMobile = () => {
    return (
        <div className="space-y-5">
            <div className="pb-2">
                <SearchBar placeHolder="Search by Restaurant Name" />
            </div>
            <RestaurantList />
            <PaginationSelector />
        </div>
    )
}

export default SearchPageMobile