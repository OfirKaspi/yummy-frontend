import { useParams } from "react-router-dom"

import { useGetRestaurant } from "@/api/RestaurantApi"
import MenuItem from "@/components/MenuItem"
import RestaurantInfo from "@/components/RestaurantInfo"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Loader from "@/components/ui/Loader"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import OrderSummary from "@/components/OrderSummary"
import { MenuItem as MenuItemType } from "@/types"

export type CartItem = {
    _id: string
    name: string
    price: number
    quantity: number
}

const RestaurantDetailsPage = () => {
    const { restaurantId } = useParams()
    const { restaurant, isLoading } = useGetRestaurant(restaurantId)

    const [cartItems, setCartItems] = useState<CartItem[]>([])
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

    if (isLoading || !restaurant) {
        return <Loader />
    }

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5}>
                <img src={restaurant?.imageUrl} className="rounded-md object-cover h-full w-full" />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 lg:px-32">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant} />
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {restaurant.menuItems.map((menuItem) => (
                        <MenuItem menuItem={menuItem} addToCart={() => addToCart(menuItem)} />
                    ))}
                </div>
                <div>
                    <Card className="md:sticky md:top-5">
                        <OrderSummary
                            restaurant={restaurant}
                            cartItems={cartItems}
                            removeFromCart={removeFromCart}
                            adjustItemQuantity={adjustItemQuantity}
                        />
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default RestaurantDetailsPage