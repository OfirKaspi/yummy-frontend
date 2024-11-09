import { useEffect, useState } from 'react'
import { CartItem } from '@/types'
import { loadCartByRestaurantId, saveCartForRestaurant } from '@/utils/cartSessionStorage'

const useCart = (restaurantId: string | undefined) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    useEffect(() => {
        if (restaurantId) {
            const restaurantCart = loadCartByRestaurantId(restaurantId)
            if (restaurantCart.length > 0) setCartItems(restaurantCart)
        }
    }, [restaurantId])

    useEffect(() => {
        if (restaurantId) saveCartForRestaurant(restaurantId, cartItems)
    }, [cartItems, restaurantId])

    const updateCartItems = (cartItem: CartItem, action: "add" | "update" | "remove") => {
        setCartItems(prevCartItems => {
            const existingItemIndex = prevCartItems.findIndex(item => item._id === cartItem._id)

            if (action === "remove") {
                return prevCartItems.filter(item => item._id !== cartItem._id)
            } else if (existingItemIndex > -1 && action === "update") {
                const updatedCart = [...prevCartItems]
                updatedCart[existingItemIndex].quantity = cartItem.quantity
                return updatedCart
            } else if (action === "add") {
                return [...prevCartItems, cartItem]
            }

            return prevCartItems
        })
    }

    return { cartItems, updateCartItems }
}

export default useCart
