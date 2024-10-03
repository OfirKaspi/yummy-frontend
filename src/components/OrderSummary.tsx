import { Restaurant } from "@/types"

import { CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { Minus, Plus, Trash } from "lucide-react"

import { CartItem } from "@/pages/RestaurantDetailsPage"

type Props = {
    restaurant: Restaurant
    cartItems: CartItem[]
    removeFromCart: (cartItem: CartItem) => void
    adjustItemQuantity: (cartItem: CartItem, newQuantity: number) => void
}

const OrderSummary = ({ cartItems, restaurant, removeFromCart, adjustItemQuantity }: Props) => {
    const getTotalCost = () => {
        const totalInCents = cartItems.reduce((total, cartItem) =>
            total + cartItem.price * cartItem.quantity,
            0
        )
        const totalWithDelivery = totalInCents + restaurant.deliveryPrice
        return (totalWithDelivery / 100).toFixed(2)
    }

    return (
        <>
            <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight flex justify-between items-center gap-6">
                    <span>Your Order</span>
                    <span>${getTotalCost()}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {cartItems.map((item) => (
                    <div className="flex justify-between">
                        <span className="flex items-center gap-2">
                            <Plus
                                className="cursor-pointer"
                                color="green"
                                size={20}
                                onClick={() => adjustItemQuantity(item, item.quantity + 1)}
                            />
                            <Badge variant="outline">
                                {item.quantity}
                            </Badge>
                            <Minus
                                className="cursor-pointer"
                                color="red"
                                size={20}
                                onClick={() => adjustItemQuantity(item, item.quantity - 1)}
                            />
                            {item.name}
                        </span>
                        <span className="flex items-center gap-2">
                            ${((item.price * item.quantity) / 100).toFixed(2)}
                            <Trash
                                className="cursor-pointer"
                                color="red"
                                size={20}
                                onClick={() => removeFromCart(item)}
                            />
                        </span>
                    </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
                </div>
                <Separator />
            </CardContent>
        </>
    )
}

export default OrderSummary