import { Order, OrderStatus } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ORDER_STATUS } from "@/config/order-status-config"
import { useUpdateMyRestaurantOrder } from "@/api/MyRestaurantApi"
import { useEffect, useState } from "react"

type Props = {
    order: Order
}

const OrderItemCard = ({ order }: Props) => {
    const { updateRestaurantStatus, isLoading } = useUpdateMyRestaurantOrder()
    const [status, setStatus] = useState<OrderStatus>(order.status)

    useEffect(() => {
        setStatus(order.status)
    }, [order])

    const handleStatusChange = async (newStatus: OrderStatus) => {
        await updateRestaurantStatus({ orderId: order._id as string, status: newStatus })
        setStatus(newStatus)
    }

    const getTime = () => {
        const orderDateTime = new Date(order.createdAt)

        const hours = orderDateTime.getHours()
        const minutes = orderDateTime.getMinutes()

        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes

        return `${hours}:${paddedMinutes}`
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="grid xl:grid-cols-4 gap-5 justify-between mb-6">
                    <div>
                        Customer Name:
                        <span className="ml-2 font-normal">
                            {order.deliveryDetails.name}
                        </span>
                    </div>
                    <div>
                        Delivery address:
                        <span className="ml-2 font-normal">
                            {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}, {order.deliveryDetails.country}
                        </span>
                    </div>
                    <div>
                        Time:
                        <span className="ml-2 font-normal">{getTime()}</span>
                    </div>
                    <div>
                        Total cost:
                        <span className="ml-2 font-normal">${(order.totalAmount / 100).toFixed()}</span>
                    </div>
                </CardTitle>
                <Separator />
            </CardHeader>
            <CardContent className="space-y-5">
                <div className="flex flex-col gap-2">
                    {order.cartItems.map((cartItem) => (
                        <span key={cartItem.menuItemId}>
                            <Badge variant="outline" className="mr-2">{cartItem.quantity}</Badge>
                            {cartItem.name}
                        </span>
                    ))}
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="status">
                        What is the status of this order?
                    </Label>
                    <Select
                        disabled={isLoading}
                        onValueChange={(value) => handleStatusChange(value as OrderStatus)}
                        value={status}
                    >
                        <SelectTrigger id="status">
                            <SelectValue placeholder="status" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {ORDER_STATUS.map((status) => (
                                <SelectItem key={status.label} value={status.value}>
                                    {status.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    )
}

export default OrderItemCard