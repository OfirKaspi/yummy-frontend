import useDeviceType from "@/hooks/useDeviceType"
import { Restaurant } from "@/types"
import RestaurantCardMobile from "../homePageMobile/RestaurantCardMobile"
import RestaurantCardDesktop from "./RestaurantCardDesktop"

type Props = {
    restaurant: Restaurant
}

const RestaurantCard = ({ restaurant }: Props) => {
    const { isDesktop, isMobile } = useDeviceType()
    return (
        <>
            {isMobile && <RestaurantCardMobile restaurant={restaurant} />}
            {isDesktop && <RestaurantCardDesktop restaurant={restaurant} />}
        </>
    )
}

export default RestaurantCard