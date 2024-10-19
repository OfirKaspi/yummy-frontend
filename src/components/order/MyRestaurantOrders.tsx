import { useGetMyRestaurantOrders } from "@/api/MyRestaurantApi"
import OrderItemCard from "@/components/order/OrderItemCard"
import { SkeletonCard } from "@/components/ui/skeleton"
import OrdersNotFound from "@/components/order/OrdersNotFound"

const MyRestaurantOrders = () => {
    const { orders, isLoading } = useGetMyRestaurantOrders()

    if (!orders || isLoading) {
        return <SkeletonCard />
    }

    if (orders.length === 0) {
        return <OrdersNotFound />
    }

    return (
        <div className="space-y-5 lg:rounded-lg lg:bg-gray-50 lg:p-10">
            <h2 className="text-2xl font-medium">{orders.length} active orders</h2>
            {orders.map((order) => (
                <OrderItemCard key={order._id} order={order} />
            ))}
        </div>
    )
}

export default MyRestaurantOrders
