import { Order } from "@/types"
import { Dot } from "lucide-react"

type Props = {
    order: Order
}

const MyOrderCardContent = ({ order }: Props) => {
    return (
        <div className="flex flex-1 items-center gap-3 ">
            <img
                src="https://www.announcementconverters.com/media/catalog/product/S/-/S-ILG11F_9.JPG"
                alt="order-img"
                className="object-cover w-16 h-16 md:w-20 md:h-20 rounded-xl"
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
    )
}

export default MyOrderCardContent