import UserSection from "@/components/homePageMobile/UserSection"
import RestaurantList from "@/components/homePageMobile/RestaurantList"
import CitySearchBar from "@/components/city/CitySearch"
import useDeviceType from "@/hooks/useDeviceType"
import Hero from "@/components/homePageMobile/Hero"

const HomePage = () => {
    const { isMobile } = useDeviceType()
    return (
        <div className="space-y-5">
            {isMobile && <>
                <UserSection />
                <CitySearchBar />
            </>}
            <Hero />
            <RestaurantList />
        </div >
    )
}

export default HomePage