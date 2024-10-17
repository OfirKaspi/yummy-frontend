import { Order } from "@/types"
import { Progress } from "@/components/ui/progress"
import { ORDER_STATUS } from "@/config/order-status-config"
import useDeviceType from "@/hooks/useDeviceType"

type Props = {
    order: Order
}

const OrderStatusHeader = ({ order }: Props) => {
    const { isDesktop, isMobile } = useDeviceType()

    const getExpectedDelivery = () => {
        const created = new Date(order.createdAt)
        created.setMinutes(
            created.getMinutes() + order.restaurant.estimatedDeliveryTime
        )

        const hours = created.getHours()
        const minutes = created.getMinutes()

        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes

        return `${hours}:${paddedMinutes}`
    }

    const getOrderStatusInfo = () => {
        return (
            ORDER_STATUS.find((orderStatus) => orderStatus.value === order.status) || ORDER_STATUS[0]
        )
    }

    return (
        <>
            {isMobile &&
                <>
                    <h1 className="text-xl font-medium tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
                        <div>
                            <span>Order Status: </span>
                            <span className="text-orange-500">{getOrderStatusInfo().label}</span>
                        </div>
                        <div>
                            <span>Expected by: </span>
                            <span>{getExpectedDelivery()}</span>
                        </div>
                    </h1>
                    <Progress className="animate-pulse" value={getOrderStatusInfo().progressValue} />
                </>
            }
            {isDesktop &&
                <>
                    <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
                        <span>Order Status: {getOrderStatusInfo().label}</span>
                        <span>Expected by: {getExpectedDelivery()}</span>
                    </h1>
                    <Progress className="animate-pulse" value={getOrderStatusInfo().progressValue} />
                </>
            }
        </>
    )
}

export default OrderStatusHeader