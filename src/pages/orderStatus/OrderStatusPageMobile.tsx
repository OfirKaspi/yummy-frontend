import MobileNav from "@/components/MobileNav"
import OrderStatusDetail from "@/components/order/OrderStatusDetail"
import OrderStatusHeader from "@/components/order/OrderStatusHeader"
import { Order } from "@/types"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
type Props = {
    orders: Order[]
}

const OrderStatusPageMobile = ({ orders }: Props) => {
    return (
        <div className="space-y-10">
            <MobileNav />
            {orders.map((order) => (
                <div key={order._id} className="space-y-10 bg-gray-50 p-10 rounded-lg">
                    <OrderStatusHeader order={order} />
                    <div className="grid gap-10 md:grid-cols-2">
                        <OrderStatusDetail order={order} />
                        <AspectRatio ratio={16 / 5}>
                            <img
                                src={order.restaurant.imageUrl}
                                className="rounded-md object-cover h-full w-full"
                                alt="restaurant-image"
                            />
                        </AspectRatio>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default OrderStatusPageMobile