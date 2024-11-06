// User
export type User = {
    _id: string
    auth0Id: string
    email: string
    name: string
    addresses: Address[]
    favoriteRestaurants: Restaurant[]
    orders: Order[]
}

export type Address = {
    _id?: string
    addressLine1: string
    city: string
    country: string
}

export type CreateUserRequest = {
    auth0Id: string
    email: string
}

export type UpdateMyUserRequest = {
    name?: string
    addresses?: Address[]
    favoriteRestaurantId?: string
}

// Restaurant
export type Restaurant = {
    _id: string
    user: string
    restaurantName: string
    city: string
    country: string
    deliveryPrice: number
    estimatedDeliveryTime: number
    cuisines: string[]
    menuItems: MenuItem[]
    imageUrl: string
    lastUpdated: string
}

export type MenuItem = {
    _id: string
    name: string
    price: number
}

export type RestaurantSearchResponse = {
    data: Restaurant[]
    pagination: Pagination
}

export type RestaurantCart = {
    restaurantId: string
    cartItems: CartItem[]
}

// Order
export type Order = {
    _id: string
    restaurant: Restaurant
    user: User
    deliveryDetails: {
        email: string
        name: string
        addressLine1: string
        city: string
        country: string
    }
    cartItems: CartItem[]
    totalAmount: number
    status: OrderStatus
    createdAt: string
    restaurantId: string
}

export type CartItem = MenuItem & {
    quantity: number
}

export type OrderStatus =
    | "placed"
    | "paid"
    | "inProgress"
    | "outForDelivery"
    | "delivered"

export type CheckoutSessionRequest = {
    cartItems: {
        menuItemId: string
        name: string
        quantity: string
    }[]
    deliveryDetails: {
        email: string
        name: string
        addressLine1: string
        city: string
    }
    restaurantId: string
}


// Search
export type Pagination = {
    total: number
    page: number
    pages: number
}

export type SortOptionValue =
    | "bestMatch"
    | "deliveryPrice"
    | "estimatedDeliveryTime"

export type SearchState = {
    searchQuery: string
    page: number
    selectedCuisines: string[]
    sortOption: SortOptionValue
}

// City

export type City = {
    id: string
    name: string
}
