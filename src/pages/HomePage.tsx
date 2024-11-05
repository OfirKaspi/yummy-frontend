import UserSection from "@/components/home/UserSection"
import RestaurantList from "@/components/search/RestaurantList"
import CitySearchBar from "@/components/search/CitySearch"
import useDeviceType from "@/hooks/useDeviceType"
import Hero from "@/components/home/Hero"

const HomePage = () => {
    const { isMobile } = useDeviceType()
    return (
        <div className="space-y-5">
            {isMobile && <>
                <UserSection />
                <CitySearchBar />
                {/* ADD BANNER WITH A DISCOUNT !!! */}
            </>}
            <Hero />
            <RestaurantList />
        </div >
    )
}

export default HomePage