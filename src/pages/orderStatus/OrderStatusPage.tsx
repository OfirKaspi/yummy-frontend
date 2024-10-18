import { useGetMyOrders } from "@/api/OrderApi"
import OrdersNotFound from "@/components/order/OrdersNotFound"
import Loader from "@/components/Loader"
import useDeviceType from "@/hooks/useDeviceType"
import OrderStatusPageMobile from "./OrderStatusPageMobile"
import OrderStatusPageDesktop from "./OrderStatusPageDesktop"
import { useMemo } from "react"

const OrderStatusPage = () => {
    const { isDesktop, isMobile } = useDeviceType()
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

    if (!orders || orders.length === 0) {
        return <OrdersNotFound />
    }

    return (
        <>
            {isMobile && <OrderStatusPageMobile ongoingOrders={ongoingOrders} deliveredOrders={deliveredOrders} />}
            {isDesktop && <OrderStatusPageDesktop ongoingOrders={ongoingOrders} deliveredOrders={deliveredOrders} />}
        </>
    )
}

export default OrderStatusPage