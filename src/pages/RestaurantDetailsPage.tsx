import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { MenuItem as MenuItemType, CartItem } from '@/types'
import { AppDispatch } from '@/store/store'
import { getRestaurantByIdStore } from '@/store/restaurant/restaurantSlice'
import { selectRestaurant, selectRestaurantLoading } from '@/store/restaurant/restaurantSelectors'
import Loader from '@/components/Loader'
import RestaurantDetailsNav from "@/components/restaurantDetails/RestaurantDetailsNav"
import RestaurantDetailsDescription from "@/components/restaurantDetails/RestaurantDetailsDescription"
import RestaurantDetailsCuisines from "@/components/restaurantDetails/RestaurantDetailsCuisines"
import RestaurantDetailsMenuItemsList from "@/components/restaurantDetails/RestaurantDetailsMenuItemsList"
import RestaurantDetailsOrderSheet from "@/components/restaurantDetails/RestaurantDetailsOrderSheet"
import { UserFormData } from '@/forms/user-profile-form/UserDetailsOrderForm'
import { useCreateCheckoutSession } from '@/hooks/order/useCreateCheckoutSession'
import { loadCartByRestaurantId, saveCartForRestaurant } from '@/utils/cartSessionStorage'

const RestaurantDetailsPage = () => {
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
                addToCart={addToCartHandler}
            />
            <RestaurantDetailsOrderSheet
                restaurant={restaurant}
                cartItems={cartItems}
                isCheckoutLoading={isCheckoutLoading}
                onCheckout={onCheckout}
                adjustItemQuantity={adjustItemQuantityHandler}
                removeFromCart={removeFromCartHandler}
            />
        </div>
    )
}

export default RestaurantDetailsPage
