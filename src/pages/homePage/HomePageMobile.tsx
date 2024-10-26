import UserSection from "@/components/homePageMobile/UserSection"
// import CuisinesFilterMobile from "@/components/cuisineFilter/CuisineFilterMobile"
import RestaurantList from "@/components/homePageMobile/RestaurantList"
// import SearchBar from "@/components/searchBar/SearchBar"
import CitySearchBar from "@/components/CitySearch"

const HomePageMobile = () => {
    return (
        <div className="space-y-5">
            <UserSection />
            <CitySearchBar />            {/* <SearchBar placeHolder="Search by City" /> */}
            {/* <CuisinesFilterMobile /> */}

            <RestaurantList />
        </div >
    )
}

export default HomePageMobile