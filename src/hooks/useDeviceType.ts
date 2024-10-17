import { useMediaQuery } from 'react-responsive'

const useDeviceType = () => {
    const isMobile = useMediaQuery({ maxWidth: 1024 })
    const isDesktop = useMediaQuery({ minWidth: 1025 })

    return { isMobile, isDesktop }
};

export default useDeviceType
