import { useMemo } from "react"
import { Order } from "@/types"
import { useGetMyOrders } from "@/hooks/order/useGetMyOrders"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MyOrderCard from "@/components/order/MyOrderCard"
import NotFound from "@/components/NotFound"
import Loader from "@/components/Loader"

const MyOrdersPage = () => {
    const { orders, isLoading } = useGetMyOrders()

    const ongoingOrders = useMemo(
        () => orders?.filter(order => order.status !== "delivered") || [],
        [orders]
    )

    const deliveredOrders = useMemo(
        () => orders?.filter(order => order.status === "delivered") || [],
        [orders]
    )

    if (isLoading) {
        return <Loader isFullScreen={true} />
    }

    const renderContent = (orders: Order[]) => {
        return orders.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto">
                {orders.map((order) => (
                    <MyOrderCard key={order._id} order={order} />
                ))}
            </div>
        ) : (
            <NotFound itemNotFound="Orders" />
        )
    }

    return (
        <Tabs defaultValue="ongoing" className="space-y-5">
            <TabsList className="flex md:w-[300px]">
                <TabsTrigger value="ongoing" className="flex-1">Ongoing</TabsTrigger>
                <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
            </TabsList>
            <Separator />
            <TabsContent value="ongoing">
                {renderContent(ongoingOrders)}
            </TabsContent>
            <TabsContent value="history" className="space-y-5">
                {renderContent(deliveredOrders)}
            </TabsContent>
        </Tabs>
    )
}

export default MyOrdersPage