import MyOrderCard from "@/components/order/MyOrderCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Order } from "@/types"


type Props = {
    ongoingOrders: Order[]
    deliveredOrders: Order[]
}

const OrderStatusPageDesktop = ({ ongoingOrders, deliveredOrders }: Props) => {
    return (
        <Tabs defaultValue="ongoing" className="space-y-5">
            <TabsList>
                <TabsTrigger value="ongoing" className="flex-1">Ongoing</TabsTrigger>
                <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
            </TabsList>
            <TabsContent value="ongoing" className="space-y-5">
                <div className="space-y-10">
                    {ongoingOrders.map((order) => (
                        <MyOrderCard key={order._id} order={order} />
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="history" className="space-y-5">
                <div className="space-y-10">
                    {deliveredOrders.map((order) => (
                        <MyOrderCard key={order._id} order={order} />
                    ))}
                </div>
            </TabsContent>
        </Tabs>
    )
}

export default OrderStatusPageDesktop