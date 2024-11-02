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
            <div className="flex flex-col gap-5 md:flex-row-reverse md:gap-2">
                <MyOrderCardContentMobile order={order} />
                <MyOrderCardButtonsMobile order={order} />
            </div>
        </div>
    )
}

export default MyOrderCardMobile