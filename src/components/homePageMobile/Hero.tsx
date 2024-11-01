import heroImage from '@/assets/hero.jpeg'
import yummyFullImage from "/yummyFullLogo.png"
import useDeviceType from '@/hooks/useDeviceType'

const Hero = () => {
    const { isMobile } = useDeviceType()
    return (
        <div className="relative -mx-5">
            <h1 className='grid md:grid-cols-[1fr_200px_1fr] md:text-5xl lg:text-6xl text-orange-500 items-center justify-center font-bitter font-bold'>
                {!isMobile && <span className='text-end'>Best Food</span>}
                <img src={yummyFullImage} alt="yummy-image" className='w-[200px]' />
                {!isMobile && <span>Same Place</span>}
            </h1>
            <img src={heroImage} alt="hero-image" className="w-full h-[400px] object-cover" />
            <div className="custom-gradient-overlay">
            </div>
        </div>
    )
}

export default Hero