import { Order } from "@/types"
import MyOrderCardStatusMobile from "@/components/order/MyOrderCardStatusMobile"
import MyOrderCardContentMobile from "@/components/order/MyOrderCardContentMobile"
import MyOrderCardButtonsMobile from "@/components/order/MyOrderCardButtonsMobile"

type Props = {
    order: Order
}

const MyOrderCardMobile = ({ order }: Props) => {
    return (
        <div key={order._id} className="space-y-5">
            <MyOrderCardStatusMobile status={order.status} />
            <MyOrderCardContentMobile order={order} />
            <MyOrderCardButtonsMobile order={order} />
        </div>
    )
}

export default MyOrderCardMobile