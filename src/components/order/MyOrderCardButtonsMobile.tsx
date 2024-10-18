import { Link } from "react-router-dom"
import TrackOrder from "@/components/order/TrackOrder"
import { Order } from "@/types"

type Props = {
    order: Order
}

const MyOrderCardButtonsMobile = ({ order }: Props) => {
    return (
        <div className="grid grid-cols-2 gap-10">
            <TrackOrder order={order} />
            <Link
                to={`/details/${order.restaurant._id}`}
                className="text-orange-500 rounded-lg border-2 border-orange-500 font-medium text-xs text-center py-2"
            >
                Restaurant Details
            </Link>
        </div>
    )
}

export default MyOrderCardButtonsMobile