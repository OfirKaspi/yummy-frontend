import MyOrderCardMobile from "@/components/order/MyOrderCardMobile"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Order } from "@/types"
import MainNavMobile from "@/components/navigation/MainNavMobile"
import NotFound from "@/components/NotFound"

type Props = {
    ongoingOrders: Order[]
    deliveredOrders: Order[]
}

const NyOrdersPageMobile = ({ ongoingOrders, deliveredOrders }: Props) => {
    return (
        <div className="space-y-5">
            <MainNavMobile>
                My Orders
            </MainNavMobile>
            <Tabs defaultValue="ongoing" className="space-y-5">
                <TabsList className="flex">
                    <TabsTrigger value="ongoing" className="flex-1">Ongoing</TabsTrigger>
                    <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
                </TabsList>
                <Separator />
                <TabsContent value="ongoing" className="space-y-5">
                    {ongoingOrders.length > 0 ? (
                        ongoingOrders.map((order, index) => (
                            <>
                                {index !== 0 && <Separator />}
                                <MyOrderCardMobile key={order._id} order={order} />
                            </>
                        ))
                    ) : (
                        <NotFound itemNotFound="Orders" />
                    )}

                </TabsContent>
                <TabsContent value="history" className="space-y-5">
                    {deliveredOrders.length > 0 ? (
                        deliveredOrders.map((order, index) => (
                            <>
                                {index !== 0 && <Separator />}
                                <MyOrderCardMobile key={order._id} order={order} />
                            </>
                        ))
                    ) : (
                        <NotFound itemNotFound="Orders" />
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default NyOrdersPageMobile