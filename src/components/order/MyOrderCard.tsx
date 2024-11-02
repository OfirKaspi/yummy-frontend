import { Order } from "@/types"
import MyOrderCardStatusMobile from "@/components/order/MyOrderCardStatus"
import MyOrderCardContent from "@/components/order/MyOrderCardContent"
import MyOrderCardButtons from "@/components/order/MyOrderCardButtons"

type Props = {
    order: Order
}

const MyOrderCardMobile = ({ order }: Props) => {
    return (
        <div key={order._id} className="space-y-5">
            <MyOrderCardStatusMobile status={order.status} />
            <div className="flex flex-col gap-5 md:flex-row-reverse md:gap-2">
                <MyOrderCardContent order={order} />
                <MyOrderCardButtons order={order} />
            </div>
        </div>
    )
}

export default MyOrderCardMobile