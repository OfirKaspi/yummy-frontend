import { matchPath, useLocation } from "react-router-dom"
import useDeviceType from "@/hooks/useDeviceType"
import MobileNav from "@/components/navigation/MobileNav"
import PervPageNavButton from "@/components/navigation/PervPageNavButton"
import DesktopNav from "@/components/navigation/DesktopNav"
import GlobalCart from "@/components/homePageMobile/GlobalCart"
import DeliverTo from "@/components/homePageMobile/DeliverTo"
import SearchResultsInfoMobile from "@/components/searchResultsInfo/SearchResultsInfoMobile"

const MainNav = () => {
    const location = useLocation()
    const { isMobile } = useDeviceType()

    const navigationItems = [
        { path: "/", component: <DeliverTo /> },
        { path: "/my-orders", label: "My Orders" },
        { path: "/my-profile", label: "My Profile" },
        { path: "/my-restaurant", label: "My Restaurant" },
        { path: "/search/:city", component: <SearchResultsInfoMobile /> },
        { path: "/details/:restaurantId", label: "Restaurant Details" },
    ]

    const activeNavItem = navigationItems.find(item => matchPath(item.path, location.pathname))

    return (
        <div className="flex items-center gap-5">
            {
                location.pathname === '/' || !isMobile
                    ? <GlobalCart />
                    : <PervPageNavButton />
            }
            <div className="flex-1">
                {activeNavItem?.component ?? activeNavItem?.label ?? "Error finding page"}
            </div>
            {
                isMobile
                    ? <MobileNav />
                    : <DesktopNav />
            }
        </div>
    )
}

export default MainNav