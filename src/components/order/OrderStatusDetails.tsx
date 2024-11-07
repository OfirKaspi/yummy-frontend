import { Order } from "@/types"
import { Separator } from "@/components/ui/separator"

type Props = {
    order: Order
}

const OrderStatusDetails = ({ order }: Props) => {
    return (
        <div className="space-y-2 text-sm">
            <Separator />
            <div className="flex flex-col">
                <span className="font-medium">Delivering to:</span>
                <span className="text-gray-800 dark:text-gray-200">{order.deliveryDetails.name}</span>
                <span className="text-gray-800 dark:text-gray-200">{order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}, {order.deliveryDetails.country} </span>
            </div>
            <div className="flex flex-col">
                <span className="font-medium">Your Order</span>
                <ul>
                    {order.cartItems.map((item) => (
                        <li className="text-gray-800 dark:text-gray-200" key={item.name}>
                            {item.name} x {item.quantity}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col">
                <span className="font-medium">Total</span>
                <span className="text-gray-800 dark:text-gray-200">${(order.totalAmount / 100).toFixed(2)}</span>
            </div>
        </div>
    )
}

export default OrderStatusDetails