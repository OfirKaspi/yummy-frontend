import { useGetMyOrders } from "@/api/OrderApi"
import OrdersNotFound from "@/components/order/OrdersNotFound"
import OrderStatusDetail from "@/components/order/OrderStatusDetail"
import OrderStatusHeader from "@/components/order/OrderStatusHeader"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Loader from "@/components/Loader"

const OrderStatusPage = () => {
    const { orders, isLoading } = useGetMyOrders()

    if (isLoading) {
        return <Loader />
    }

    if (!orders || orders.length === 0) {
        return <OrdersNotFound />
    }

    return (
        <div className="space-y-10">
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

export default OrderStatusPage