import UserSection from "@/components/homePageMobile/UserSection"
// import CuisinesFilterMobile from "@/components/cuisineFilter/CuisineFilterMobile"
import RestaurantList from "@/components/homePageMobile/RestaurantList"
import SearchBar, { SearchForm } from "@/components/searchBar/SearchBar"

type Props = {
    handleSearchSubmit: (searchFormValues: SearchForm) => void
}

const HomePageMobile = ({ handleSearchSubmit }: Props) => {
    return (
        <div className="space-y-5">
            <UserSection />
            <SearchBar onSubmit={handleSearchSubmit} placeHolder="Search by City" />
            {/* <CuisinesFilterMobile /> */}
            <RestaurantList />
        </div >
    )
}

export default HomePageMobile