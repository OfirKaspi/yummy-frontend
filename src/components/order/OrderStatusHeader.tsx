import { Order } from "@/types"
import { Progress } from "@/components/ui/progress"
import { ORDER_STATUS } from "@/config/order-status-config"
import { getExpectedDelivery } from "@/utils/getExpectedDelivery"

type Props = {
    order: Order
}

const OrderStatusHeader = ({ order }: Props) => {
    const getOrderStatusInfo = () => {
        return (
            ORDER_STATUS.find((orderStatus) => orderStatus.value === order.status) || ORDER_STATUS[0]
        )
    }

    return (
        <section>
            <Progress className="animate-pulse my-2 h-3" value={getOrderStatusInfo().progressValue} />
            <h1 className="text-lg font-medium tracking-tighter flex flex-col md:gap-5 md:flex-row md:justify-between">
                <div>
                    <span>Order Status: </span>
                    <span className="text-orange-500">{getOrderStatusInfo().label}</span>
                </div>
                <div>
                    <span>Expected by: </span>
                    <span>{getExpectedDelivery({ order })}</span>
                </div>
            </h1>
        </section>
    )
}

export default OrderStatusHeader