import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { MenuItem as MenuItemType, CartItem } from '@/types'
import { AppDispatch } from '@/store/store'
import { getRestaurantByIdStore } from '@/store/restaurant/restaurantSlice'
import { selectRestaurant, selectRestaurantLoading } from '@/store/restaurant/restaurantSelectors'
import useDeviceType from '@/hooks/useDeviceType'
import RestaurantDetailsPageDesktop from '@/pages/restaurantDetailsPage/RestaurantDetailsPageDesktop'
import RestaurantDetailsPageMobile from '@/pages/restaurantDetailsPage/RestaurantDetailsPageMobile'
import { UserFormData } from '@/forms/user-profile-form/UserProfileForm'
import { useCreateCheckoutSession } from '@/hooks/order/useCreateCheckoutSession'
import Loader from '@/components/Loader'
import { loadCartByRestaurantId, saveCartForRestaurant } from '@/utils/cartSessionStorage'

const RestaurantDetailsPage = () => {
    const { isMobile } = useDeviceType()
    const { restaurantId } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const restaurant = useSelector(selectRestaurant)
    const isLoading = useSelector(selectRestaurantLoading)
    const { createCheckoutSession, isLoading: isCheckoutLoading } = useCreateCheckoutSession()
    const [checkedFoodSection, setCheckedFoodSection] = useState('')
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    useEffect(() => {
        if (restaurantId) {
            const restaurantCart = loadCartByRestaurantId(restaurantId)
            if (restaurantCart.length > 0) {
                setCartItems(restaurantCart)
            }
        }
    }, [restaurantId])

    useEffect(() => {
        if (restaurantId) {
            saveCartForRestaurant(restaurantId, cartItems)
        }
    }, [cartItems, restaurantId])

    useEffect(() => {
        if (restaurantId) {
            dispatch(getRestaurantByIdStore(restaurantId))
        }
    }, [dispatch, restaurantId])

    useEffect(() => {
        if (restaurant?.cuisines && restaurant.cuisines.length > 0) {
            setCheckedFoodSection(restaurant.cuisines[0])
        }
    }, [restaurant])

    const handleFoodSection = (foodSection: string) => {
        setCheckedFoodSection(foodSection)
    }

    const addToCartHandler = (menuItem: MenuItemType) => {
        setCartItems((prevCartItems) => {
            const existingCartItem = prevCartItems.find((cartItem) => cartItem._id === menuItem._id)

            if (existingCartItem) {
                return prevCartItems.map((cartItem) =>
                    cartItem._id === existingCartItem._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                )
            } else {
                return [
                    ...prevCartItems,
                    {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1,
                    }
                ]
            }
        })
    }

    const adjustItemQuantityHandler = (cartItem: CartItem, newQuantity: number) => {
        if (newQuantity === 0) {
            removeFromCartHandler(cartItem)
            return
        }

        setCartItems((prevCartItems) =>
            prevCartItems.map((item) =>
                item._id === cartItem._id
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        )
    }

    const removeFromCartHandler = (cartItem: CartItem) => {
        setCartItems((prevCartItems) =>
            prevCartItems.filter((item) => item._id !== cartItem._id)
        )
    }

    const onCheckout = async (userFormData: UserFormData) => {
        if (!restaurant) {
            return
        }

        const checkoutData = {
            cartItems: cartItems.map((cartItem) => ({
                menuItemId: cartItem._id,
                name: cartItem.name,
                quantity: cartItem.quantity.toString(),
            })),
            restaurantId: restaurant._id,
            deliveryDetails: {
                name: userFormData.name,
                addressLine1: userFormData.addressLine1,
                city: userFormData.city,
                country: userFormData.country,
                email: userFormData.email as string
            }
        }

        const data = await createCheckoutSession(checkoutData)
        window.location.href = data.url
    }

    if (isLoading || !restaurant) {
        return <Loader isFullScreen={true} />
    }

    return isMobile
        ? <RestaurantDetailsPageMobile
            restaurant={restaurant}
            cartItems={cartItems}
            addToCart={addToCartHandler}
            handleFoodSection={handleFoodSection}
            checkedFoodSection={checkedFoodSection}
            onCheckout={onCheckout}
            isCheckoutLoading={isCheckoutLoading}
            adjustItemQuantity={adjustItemQuantityHandler}
            removeFromCart={removeFromCartHandler}
        />
        : <RestaurantDetailsPageDesktop
            restaurant={restaurant}
            cartItems={cartItems}
            addToCart={addToCartHandler}
            onCheckout={onCheckout}
            isCheckoutLoading={isCheckoutLoading}
            adjustItemQuantity={adjustItemQuantityHandler}
            removeFromCart={removeFromCartHandler}
        />
}

export default RestaurantDetailsPage
