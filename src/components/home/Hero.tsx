import heroImage from '@/assets/hero.jpeg'
import yummyFullImage from "/yummyFullLogo.png"
import useDeviceType from '@/hooks/useDeviceType'

const Hero = () => {
    const { isMobile } = useDeviceType()
    return (
        <div className="relative -mx-5">
            {!isMobile &&
                <h1 className='grid grid-cols-[1fr_200px_1fr] text-5xl text-orange-500 items-center justify-center font-bitter font-bold'>
                    <span className='text-end'>Best Food</span>
                    <img src={yummyFullImage} alt="yummy-image" className='w-[200px]' />
                    <span>Same Place</span>
                </h1>
            }
            <img src={heroImage} alt="hero-image" className="w-full h-[500px] object-cover" />
            <div className="custom-gradient-overlay" />
        </div >
    )
}

export default Hero