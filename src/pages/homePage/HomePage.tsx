import { useNavigate } from 'react-router-dom'

import useDeviceType from '@/hooks/useDeviceType'

import { SearchForm } from '@/components/SearchBar'
import HomePageMobile from './HomePageMobile'
import HomePageDesktop from './HomePageDesktop'

const HomePage = () => {
    const navigate = useNavigate()
    const { isMobile, isDesktop } = useDeviceType()

    const handleSearchSubmit = (searchFormValues: SearchForm) => {
        navigate({
            pathname: `/search/${searchFormValues.searchQuery}`
        })
    }

    return (
        <>
            {/* {isMobile && <HomePageMobile handleSearchSubmit={handleSearchSubmit} />} */}
            {isMobile && <HomePageMobile />}
            {isDesktop && <HomePageDesktop handleSearchSubmit={handleSearchSubmit} />}
        </>
    )
}

export default HomePage