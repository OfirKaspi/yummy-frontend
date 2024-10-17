import { useGetMyOrders } from "@/api/OrderApi"
import OrdersNotFound from "@/components/order/OrdersNotFound"
import Loader from "@/components/Loader"
import useDeviceType from "@/hooks/useDeviceType"
import OrderStatusPageMobile from "./OrderStatusPageMobile"
import OrderStatusPageDesktop from "./OrderStatusPageDesktop"

const OrderStatusPage = () => {
    const { isDesktop, isMobile } = useDeviceType()
    const { orders, isLoading } = useGetMyOrders()

    if (isLoading) {
        return <Loader isFullScreen={true} />
    }

    if (!orders || orders.length === 0) {
        return <OrdersNotFound />
    }

    return (
        <>
            {isMobile && <OrderStatusPageMobile orders={orders} />}
            {isDesktop && <OrderStatusPageDesktop orders={orders} />}
        </>
    )
}

export default OrderStatusPage