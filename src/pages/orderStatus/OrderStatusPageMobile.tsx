import MobileNav from "@/components/navigation/MobileNav"
import MyOrderCardMobile from "@/components/order/MyOrderCardMobile"
import PervPageNavButton from "@/components/navigation/PervPageNavButton"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Order } from "@/types"

type Props = {
    ongoingOrders: Order[]
    deliveredOrders: Order[]
}

const OrderStatusPageMobile = ({ ongoingOrders, deliveredOrders }: Props) => {
    return (
        <div className="space-y-5">
            <div className="flex items-center gap-5">
                <PervPageNavButton />
                <h1 className="text-lg flex-1">My Orders</h1>
                <MobileNav />
            </div>
            <Tabs defaultValue="ongoing" className="space-y-5">
                <TabsList className="flex">
                    <TabsTrigger value="ongoing" className="flex-1">Ongoing</TabsTrigger>
                    <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
                </TabsList>
                <TabsContent value="ongoing" className="space-y-5">
                    {ongoingOrders.map((order, index) => (
                        <>
                            {index < ongoingOrders.length && <Separator />}
                            <MyOrderCardMobile key={order._id} order={order} />
                        </>
                    ))}

                </TabsContent>
                <TabsContent value="history" className="space-y-5">
                    {deliveredOrders.map((order, index) => (
                        <>
                            {index < deliveredOrders.length && <Separator />}
                            <MyOrderCardMobile key={order._id} order={order} />
                        </>
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default OrderStatusPageMobile