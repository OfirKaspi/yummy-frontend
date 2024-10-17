import MyOrderCard from "@/components/order/MyOrderCard"
import { Order } from "@/types"

type Props = {
    orders: Order[]
}

const OrderStatusPageDesktop = ({ orders }: Props) => {
    return (
        <div className="space-y-10">
            {orders.map((order) => (
                <MyOrderCard key={order._id} order={order} />
            ))}
        </div>
    )
}

export default OrderStatusPageDesktop