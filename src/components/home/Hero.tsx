import heroImage from '@/assets/heroImage.jpg'
import { Button } from '@/components/ui/button'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import useDeviceType from '@/hooks/useDeviceType'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const { isMobile } = useDeviceType()
    const navigate = useNavigate()

    return (
        <div className="relative sm:-mx-5 rounded-lg sm:rounded-none overflow-hidden max-h-[500px]">
            <AspectRatio ratio={16 / 9} className="max-h-[500px]">
                <img src={heroImage} alt="hero-image" className="object-cover" />
                <div className='flex flex-col justify-center sm:py-5 absolute top-0 left-0 sm:left-5 max-w-[40%] h-full gap-2 sm:gap-5 md:gap-10'>
                    <h1 className='text-xl sm:text-5xl text-slate-900'>All your favorite restaurants in one place</h1>
                    <div className='flex gap-2'>
                        <Button variant="default" onClick={() => navigate('/search/Tel Aviv')} className='sm:text-lg sm:p-5 w-fit'>Explore</Button>
                        {!isMobile && <Button variant="default" onClick={() => navigate('/about')} className='sm:text-lg sm:p-5 w-fit'>About us</Button>}
                    </div>
                </div>
            </AspectRatio>
        </div >
    )
}

export default Hero