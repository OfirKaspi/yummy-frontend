import { CartItem } from '@/types'

type RestaurantCart = {
    restaurantId: string
    cartItems: CartItem[]
}

export const loadCartsFromStorage = (): RestaurantCart[] => {
    const storedCarts = sessionStorage.getItem('carts')
    return storedCarts ? JSON.parse(storedCarts) : []
}

export const saveCartsToStorage = (carts: RestaurantCart[]) => {
    sessionStorage.setItem('carts', JSON.stringify(carts))
}

export const loadCartByRestaurantId = (restaurantId: string): CartItem[] => {
    const carts = loadCartsFromStorage()
    const restaurantCart = carts.find(cart => cart.restaurantId === restaurantId)
    return restaurantCart ? restaurantCart.cartItems : []
}

export const saveCartForRestaurant = (restaurantId: string, cartItems: CartItem[]) => {
    const carts = loadCartsFromStorage()
    const updatedCarts = carts.filter(cart => cart.restaurantId !== restaurantId)

    if (cartItems.length === 0) {
        saveCartsToStorage(updatedCarts)
    } else {
        updatedCarts.unshift({ restaurantId, cartItems })
        saveCartsToStorage(updatedCarts)
    }
}