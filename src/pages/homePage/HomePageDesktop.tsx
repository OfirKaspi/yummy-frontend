import landingImage from '@/assets/landing.png'
import appDownloadImg from '@/assets/appDownload.png'

import SearchBar from "@/components/searchBar/SearchBar"

const HomePageDesktop = () => {
    return (
        <div>
            <div className="flex flex-col gap-12">
                <div className="px-10 md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                    <h1 className="text-5xl font-bold tracking-tight text-orange-500">
                        What do you bring to the table?
                    </h1>
                    <span className="text-xl">Food is just a click away!</span>
                    <SearchBar placeHolder="Search by City or Town" />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                    <img src={landingImage} alt="landing-image" />
                    <div className='flex flex-col items-center justify-center gap-4 text-center'>
                        <span className='font-bold text-3xl tracking-tight'>
                            Order takeaway even faster!
                        </span>
                        <span>
                            Download the Yummy App for faster ordering and personalized recommendations
                        </span>
                        <img src={appDownloadImg} alt="app-downloading-img" />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default HomePageDesktop