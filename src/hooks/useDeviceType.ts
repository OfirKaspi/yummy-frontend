import { useMediaQuery } from 'react-responsive'

const useDeviceType = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 })
    const isDesktop = useMediaQuery({ minWidth: 769 })

    return { isMobile, isDesktop }
};

export default useDeviceType
