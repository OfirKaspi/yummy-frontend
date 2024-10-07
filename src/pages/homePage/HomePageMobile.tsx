// type Props = {
//     handleSearchSubmit: (searchFormValues: SearchForm) => void
// }
import UserSection from "./UserSection"
import SearchSection from "@/components/homePageMobile/SearchSection"
import AllCuisinesSection from "@/components/homePageMobile/AllCuisinesSection"

const HomePageMobile = () => {
    return (
        <div className="space-y-5">
            <UserSection />
            <SearchSection />
            <AllCuisinesSection />
        </div >
    )
}

export default HomePageMobile