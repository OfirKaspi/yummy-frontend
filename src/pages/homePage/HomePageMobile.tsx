import UserSection from "@/components/homePageMobile/UserSection"
import SearchSection from "@/components/homePageMobile/SearchSection"
// import CuisinesFilterMobile from "@/components/cuisineFilter/CuisineFilterMobile"
import RestaurantList from "@/components/homePageMobile/RestaurantList"
import { SearchForm } from "@/components/SearchBar"

type Props = {
    handleSearchSubmit: (searchFormValues: SearchForm) => void
}

const HomePageMobile = ({ handleSearchSubmit }: Props) => {
    return (
        <div className="space-y-5">
            <UserSection />
            <SearchSection onSubmit={handleSearchSubmit} />
            {/* <CuisinesFilterMobile /> */}
            <RestaurantList />
        </div >
    )
}

export default HomePageMobile