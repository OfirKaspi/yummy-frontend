import MobileNav from "@/components/navigation/MobileNav"
import PervPageNavButton from "@/components/navigation/PervPageNavButton"
import GlobalCart from "@/components/GlobalCart"

type Props = {
    children: React.ReactNode
    isHomePage?: boolean
}

const MainNavMobile = ({ children, isHomePage = false }: Props) => {
    return (
        <div className="flex items-center gap-5">
            {isHomePage ? (
                <GlobalCart />
            ) : (
                <PervPageNavButton />
            )}
            <div className="flex-1">
                <div className="text-lg flex-1">{children}</div>
            </div>
            <MobileNav />
        </div>
    )
}

export default MainNavMobile