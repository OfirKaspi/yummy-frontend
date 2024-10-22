import { useGetMyOrders } from "@/api/OrderApi"
import NotFound from "@/components/NotFound"
import Loader from "@/components/Loader"
import useDeviceType from "@/hooks/useDeviceType"
import NyOrdersPageMobile from "@/pages/myOrdersPage/MyOrdersPageMobile"
import MyOrdersPageDesktop from "@/pages/myOrdersPage//MyOrdersPageDesktop"
import { useMemo } from "react"

const MyOrdersPage = () => {
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
        return <NotFound itemNotFound="orders" />
    }

    return (
        <>
            {isMobile && <NyOrdersPageMobile ongoingOrders={ongoingOrders} deliveredOrders={deliveredOrders} />}
            {isDesktop && <MyOrdersPageDesktop ongoingOrders={ongoingOrders} deliveredOrders={deliveredOrders} />}
        </>
    )
}

export default MyOrdersPage