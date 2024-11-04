import MainNav from "@/components/navigation/MainNav"
import useDeviceType from "@/hooks/useDeviceType"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"

type Props = {
    restaurantImg: string
    restaurantName: string
}

const RestaurantDetailsNav = ({ restaurantImg, restaurantName }: Props) => {
    const { isMobile } = useDeviceType()
    if (isMobile) {
        return (
            <div
                className="flex justify-between -mt-5 -mx-5 p-5 h-80 rounded-b-3xl bg-cover bg-center"
                style={{ backgroundImage: `url(${restaurantImg})` }}
            >
                <div className="flex-1">
                    <MainNav />
                </div>
            </div>
        )
    }

    return (
        <>
            <MainNav customLabel={restaurantName} />
            <AspectRatio ratio={16 / 5}>
                <img src={restaurantImg} className="rounded-md object-cover h-full w-full" />
            </AspectRatio>
        </>
    )
}

export default RestaurantDetailsNav