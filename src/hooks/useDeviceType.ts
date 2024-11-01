import { useMediaQuery } from 'react-responsive'

const useDeviceType = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 })
    const isDesktop = useMediaQuery({ minWidth: 768.01 })

    return { isMobile, isDesktop }
};

export default useDeviceType
