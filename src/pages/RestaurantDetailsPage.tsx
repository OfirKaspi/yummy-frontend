import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AppDispatch } from '@/store/store'
import { getRestaurantByIdStore } from '@/store/restaurant/restaurantSlice'
import { selectRestaurant, selectRestaurantLoading } from '@/store/restaurant/restaurantSelectors'
import Loader from '@/components/Loader'
import RestaurantDetailsNav from "@/components/restaurantDetails/RestaurantDetailsNav"
import RestaurantDetailsDescription from "@/components/restaurantDetails/RestaurantDetailsDescription"
import RestaurantDetailsCuisines from "@/components/restaurantDetails/RestaurantDetailsCuisines"
import RestaurantDetailsMenuItemsList from "@/components/restaurantDetails/RestaurantDetailsMenuItemsList"
import RestaurantDetailsOrderSheet from "@/components/restaurantDetails/RestaurantDetailsOrderSheet"
import useCart from '@/hooks/useCart'
import useCheckedFoodSection from '@/hooks/useCheckedFoodSection'

const RestaurantDetailsPage = () => {
    const { restaurantId } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const restaurant = useSelector(selectRestaurant)
    const isLoading = useSelector(selectRestaurantLoading)

    const { cartItems, updateCartItems } = useCart(restaurantId)
    const { checkedFoodSection, handleFoodSection } = useCheckedFoodSection(restaurant)

    useEffect(() => {
        if (restaurantId) {
            dispatch(getRestaurantByIdStore(restaurantId)).catch(error =>
                console.error("Error fetching restaurant data:", error)
            )
        }
    }, [dispatch, restaurantId])

    if (isLoading || !restaurant) {
        return <Loader isFullScreen={true} />
    }

    return (
        <div className="space-y-5 p-5 pb-24">
            <RestaurantDetailsNav restaurantImg={restaurant.imageUrl} restaurantName={restaurant.restaurantName} />
            <RestaurantDetailsDescription restaurant={restaurant} />
            <RestaurantDetailsCuisines
                cuisines={restaurant.cuisines}
                handleFoodSection={handleFoodSection}
                checkedFoodSection={checkedFoodSection}
            />
            <RestaurantDetailsMenuItemsList
                cartItems={cartItems}
                menuItems={restaurant.menuItems}
                handleCartAction={updateCartItems}
            />
            <RestaurantDetailsOrderSheet
                restaurant={restaurant}
                cartItems={cartItems}
                handleCartAction={updateCartItems}
            />
        </div>
    )
}

export default RestaurantDetailsPage
