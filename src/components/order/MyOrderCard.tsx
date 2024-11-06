import { useState } from "react"
import { ChevronDown, ChevronUp, Dot } from "lucide-react"
import { Order } from "@/types"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import OrderStatusHeader from "@/components/order/OrderStatusHeader"
import OrderStatusDetails from "@/components/order/OrderStatusDetails"

type Props = {
    order: Order
}

const MyOrderCard = ({ order }: Props) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="flex flex-col gap-5 w-full">
                <div className="grid grid-cols-[80px_1fr] items-center gap-5">
                    <AspectRatio ratio={1 / 1}>
                        <img src={order.restaurant.imageUrl} className="rounded-lg object-cover h-full w-full" />
                    </AspectRatio>
                    <div className='space-y-1'>
                        <div className="flex items-center justify-between md:justify-start md:gap-2">
                            <span className="font-medium text-lg">{order.restaurant.restaurantName}</span>

                        </div>
                        <div className="flex flex-col items-start gap-1 text-xs text-gray-600">
                            <span className="flex">
                                Total: ${(order.totalAmount / 100).toFixed(2)}
                                <Dot size={16} />
                                {order.cartItems.length} {order.cartItems.length > 1 ? "items" : "item"}
                            </span>
                            {isOpen ? (
                                <span className="flex gap-1 text-orange-500">See Less <ChevronUp size={16} /></span>
                            ) : (
                                <span className="flex gap-1 text-orange-500">See More <ChevronDown size={16} /></span>
                            )}
                        </div>
                    </div>
                </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <OrderStatusHeader order={order} />
                <OrderStatusDetails order={order} />
            </CollapsibleContent>
        </Collapsible>
    )
}

export default MyOrderCard