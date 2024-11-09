import { Minus, Plus, Trash } from "lucide-react"
import { Restaurant, CartItem } from "@/types"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type Props = {
    restaurant: Restaurant
    cartItems: CartItem[]
    handleCartAction: (cartItem: CartItem, action: "add" | "update" | "remove") => void
}

const OrderSummary = ({ cartItems, restaurant, handleCartAction }: Props) => {
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
                    <div key={item._id} className="flex justify-between">
                        <span className="flex items-center gap-2">
                            <Plus
                                className="cursor-pointer"
                                color="green"
                                size={20}
                                onClick={() => handleCartAction({ ...item, quantity: item.quantity + 1 }, "update")}
                            />
                            <Badge variant="outline">
                                {item.quantity}
                            </Badge>
                            <Minus
                                className="cursor-pointer"
                                color="red"
                                size={20}
                                onClick={() => handleCartAction({ ...item, quantity: item.quantity - 1 }, item.quantity - 1 > 0 ? "update" : "remove")}
                            />
                            {item.name}
                        </span>
                        <span className="flex items-center gap-2">
                            ${((item.price * item.quantity) / 100).toFixed(2)}
                            <Trash
                                className="cursor-pointer"
                                color="red"
                                size={20}
                                onClick={() => handleCartAction(item, "remove")}
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
