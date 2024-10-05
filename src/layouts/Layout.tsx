import useDeviceType from "@/hooks/useDeviceType"

import LayoutDesktop from "./LayoutDesktop"
import LayoutMobile from "./LayoutMobile"

type Props = {
    children: React.ReactNode
    showHero?: boolean
}

const Layout = ({ children, showHero = false }: Props) => {
    const { isDesktop, isMobile } = useDeviceType()

    return (
        <>
            {isMobile && <LayoutMobile children={children} />}
            {isDesktop && <LayoutDesktop children={children} showHero={showHero} />}
        </>
    )
}

export default Layout