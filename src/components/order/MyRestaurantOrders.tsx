import { useGetMyRestaurantOrders } from "@/hooks/myRestaurant/useGetMyRestaurantOrders"
import OrderItemCard from "@/components/order/OrderItemCard"
import { SkeletonCard } from "@/components/ui/skeleton"
import NotFound from "@/components/NotFound"

const MyRestaurantOrders = () => {
    const { orders, isLoading } = useGetMyRestaurantOrders()

    if (isLoading) {
        return (
            <div className="max-w-[500px]">
                <SkeletonCard />
            </div>
        )
    }

    if (!orders || orders.length === 0) {
        return <NotFound itemNotFound="orders" />
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
