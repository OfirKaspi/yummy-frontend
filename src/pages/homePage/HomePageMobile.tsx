import UserSection from "@/components/homePageMobile/UserSection"
import RestaurantList from "@/components/homePageMobile/RestaurantList"
import CitySearchBar from "@/components/city/CitySearch"

const HomePageMobile = () => {
    return (
        <div className="space-y-5">
            <UserSection />
            <CitySearchBar />
            <RestaurantList />
        </div >
    )
}

export default HomePageMobile