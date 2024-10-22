import { useNavigate } from 'react-router-dom'

import useDeviceType from '@/hooks/useDeviceType'

import { SearchForm } from '@/components/searchBar/SearchBar'
import HomePageMobile from './HomePageMobile'
import HomePageDesktop from './HomePageDesktop'

const HomePage = () => {
    const { isMobile, isDesktop } = useDeviceType()
    const navigate = useNavigate()

    const handleSearchSubmit = (searchFormValues: SearchForm) => {
        navigate({ pathname: `/search/${searchFormValues.searchQuery}` })
    }

    return (
        <>
            {/* {isMobile && <HomePageMobile handleSearchSubmit={handleSearchSubmit} />} */}
            {isMobile && <HomePageMobile handleSearchSubmit={handleSearchSubmit} />}
            {isDesktop && <HomePageDesktop handleSearchSubmit={handleSearchSubmit} />}
        </>
    )
}

export default HomePage