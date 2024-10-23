import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { MenuItem as MenuItemType } from "@/types"
import { AppDispatch } from '@/store/store'
import { getRestaurantByIdStore } from '@/store/restaurant/restaurantSlice'
import { selectRestaurant, selectRestaurantLoading } from '@/store/restaurant/restaurantSelectors'
import useDeviceType from '@/hooks/useDeviceType'
import RestaurantDetailsPageDesktop from '@/pages/restaurantDetailsPage/RestaurantDetailsPageDesktop'
import RestaurantDetailsPageMobile from '@/pages/restaurantDetailsPage/RestaurantDetailsPageMobile'
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm"
import { useCreateCheckoutSession } from "@/api/orderAPI"
import Loader from '@/components/Loader'

export type CartItem = {
    _id: string
    name: string
    price: number
    quantity: number
}

const loadCartFromStorage = (restaurantId: string): CartItem[] => {
    const storedCart = sessionStorage.getItem(`cartItems-${restaurantId}`)
    return storedCart ? JSON.parse(storedCart) : []
}

const saveCartToStorage = (restaurantId: string, cartItems: CartItem[]) => {
    sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(cartItems))
}

const RestaurantDetailsPage = () => {
    const { isMobile } = useDeviceType()
    const { restaurantId } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const restaurant = useSelector(selectRestaurant)
    const isLoading = useSelector(selectRestaurantLoading)
    const [checkedFoodSection, setCheckedFoodSection] = useState('')
    const { createCheckoutSession, isLoading: isCheckoutLoading } = useCreateCheckoutSession()

    const [cartItems, setCartItems] = useState<CartItem[]>(() => loadCartFromStorage(restaurantId || ''))

    const handleFoodSection = (foodSection: string) => {
        setCheckedFoodSection(foodSection)
    }

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

    useEffect(() => {
        if (restaurantId) {
            saveCartToStorage(restaurantId, cartItems)
        }
    }, [cartItems, restaurantId])

    const addToCart = (menuItem: MenuItemType) => {
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

    const adjustItemQuantity = (cartItem: CartItem, newQuantity: number) => {
        if (newQuantity === 0) {
            removeFromCart(cartItem)
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

    const removeFromCart = (cartItem: CartItem) => {
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
            addToCart={addToCart}
            handleFoodSection={handleFoodSection}
            checkedFoodSection={checkedFoodSection}
            onCheckout={onCheckout}
            isCheckoutLoading={isCheckoutLoading}
            adjustItemQuantity={adjustItemQuantity}
            removeFromCart={removeFromCart}
        />
        : <RestaurantDetailsPageDesktop
            restaurant={restaurant}
            cartItems={cartItems}
            addToCart={addToCart}
            onCheckout={onCheckout}
            isCheckoutLoading={isCheckoutLoading}
            adjustItemQuantity={adjustItemQuantity}
            removeFromCart={removeFromCart}
        />
}

export default RestaurantDetailsPage
