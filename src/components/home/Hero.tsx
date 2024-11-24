import heroImage from '@/assets/heroImage.jpg'
import heroImageDark from '@/assets/heroImageDark.jpg'
import { Button } from '@/components/ui/button'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import useDeviceType from '@/hooks/useDeviceType'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsDarkMode } from '@/store/darkMode/darkModeSelectors'

const Hero = () => {
    const isDarkMode = useSelector(selectIsDarkMode)
    const { isMobile } = useDeviceType()
    const navigate = useNavigate()

    return (
        <div className="relative rounded-lg overflow-hidden max-h-[500px]">
            <AspectRatio ratio={16 / 9} className="max-h-[500px]">
                <img src={isDarkMode ? heroImageDark : heroImage} alt="hero-image" className="object-cover" />
                <div className='flex flex-col justify-center sm:py-5 absolute top-0 left-5 max-w-[40%] h-full gap-2 sm:gap-5 md:gap-10'>
                    <h1 className='text-xl sm:text-5xl'>All your favorite restaurants in one place</h1>
                    <div className='flex gap-2'>
                        <Button onClick={() => navigate('/search/Tel Aviv')} className='sm:text-lg sm:p-5 w-fit bg-orange-500 text-white dark:hover:text-gray-800'>Explore</Button>
                        {!isMobile && <Button onClick={() => navigate('/about')} className='sm:text-lg sm:p-5 w-fit bg-orange-500 text-white dark:hover:text-gray-800'>About us</Button>}
                    </div>
                </div>
            </AspectRatio>
        </div >
    )
}

export default Hero