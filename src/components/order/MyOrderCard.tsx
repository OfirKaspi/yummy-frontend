import { Link } from "react-router-dom"
import { ChevronDown, Dot } from "lucide-react"
import { Order } from "@/types"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from "@/components/ui/dialog"
import OrderStatusHeader from "@/components/order/OrderStatusHeader"
import OrderStatusDetails from "@/components/order/OrderStatusDetails"

type Props = {
    order: Order
}

const MyOrderCard = ({ order }: Props) => {
    const totalItemsQuantity = order.cartItems.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex flex-col gap-5 w-full">
                    <div className="grid grid-cols-[80px_1fr] items-center gap-5">
                        <AspectRatio ratio={1 / 1}>
                            <img src={order.restaurant.imageUrl} className="rounded-lg object-cover h-full w-full" />
                        </AspectRatio>
                        <div className="space-y-1">
                            <div className="flex items-center justify-between md:justify-start md:gap-2">
                                <span className="font-medium text-lg">{order.restaurant.restaurantName}</span>
                            </div>
                            <div className="flex flex-col items-start gap-1 text-xs text-gray-800 dark:text-gray-200">
                                <span className="flex">
                                    Total: ${(order.totalAmount / 100).toFixed(2)}
                                    <Dot size={16} />
                                    {totalItemsQuantity} {totalItemsQuantity > 1 ? "items" : "1 item"}
                                </span>
                                <span className="flex gap-1 text-orange-500 underline">
                                    See More <ChevronDown size={16} />
                                </span>
                            </div>
                        </div>
                    </div>
                </button>
            </DialogTrigger>
            <DialogContent className="p-5 space-y-2 gap-0 w-[300px] rounded-lg md:w-[500px] ">
                <DialogHeader className="text-lg font-semibold">
                    {order.restaurant.restaurantName}
                </DialogHeader>
                <AspectRatio ratio={16 / 7}>
                    <img src={order.restaurant.imageUrl} className="rounded-lg object-cover h-full w-full" />
                </AspectRatio>
                <OrderStatusHeader order={order} />
                <OrderStatusDetails order={order} />
                <Link to={`/details/${order.restaurant._id}`} className="text-orange-500 underline text-sm">See Restaurant</Link>
            </DialogContent>
        </Dialog >
    )
}

export default MyOrderCard
