import useDeviceType from '@/hooks/useDeviceType'

import HomePageMobile from '@/pages/homePage/HomePageMobile'
import HomePageDesktop from '@/pages/homePage/HomePageDesktop'

const HomePage = () => {
    const { isMobile } = useDeviceType()

    return isMobile
        ? <HomePageMobile />
        : <HomePageDesktop />
}

export default HomePage