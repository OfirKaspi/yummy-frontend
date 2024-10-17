import { Order } from "@/types"
import { Dot } from "lucide-react"
import TrackOrder from "@/components/order/TrackOrder"
import { Link } from "react-router-dom"

type Props = {
    order: Order
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "placed":
            return "text-gray-500"
        case "paid":
            return "text-yellow-500"
        case "inProgress":
            return "text-blue-500"
        case "outForDelivery":
            return "text-orange-500"
        case "delivered":
            return "text-green-500"
        default:
            return ""
    }
};

const MyOrderCardMobile = ({ order }: Props) => {
    const statusColor = getStatusColor(order.status);


    return (
        <div key={order._id} className="space-y-5">
            <div className="flex text-sm gap-3">
                <span className="font-medium">Order Status</span>
                <span className={`${statusColor} font-bold`}>{order.status}</span>
            </div>
            <div className="flex items-center gap-3 ">
                <img
                    src="https://www.announcementconverters.com/media/catalog/product/S/-/S-ILG11F_9.JPG"
                    alt="order-img"
                    className="object-cover w-16 h-16 rounded-xl"
                />
                <div className="flex flex-col flex-1 gap-2 text-sm">
                    <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{order.restaurant.restaurantName}</span>
                        <span className="text-gray-600 text-xs underline">#{order._id.slice(order._id.length - 6, order._id.length)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-medium text-sm">${(order.totalAmount / 100).toFixed()}</span>
                        <Dot size={18} />
                        <span className="text-gray-600 text-xs">
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </span>
                        <Dot size={18} />
                        <span className="text-gray-600 text-xs">{order.cartItems.length} Items</span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-10">
                <TrackOrder order={order} />
                <Link
                    to={`/details/${order.restaurantId}`}
                    className="text-orange-500 rounded-lg border-2 border-orange-500 font-medium text-xs text-center py-2"
                >
                    Restaurant Details
                </Link>
            </div>
        </div>
    )
}

export default MyOrderCardMobile