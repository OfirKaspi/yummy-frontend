import { Order } from "@/types"
import OrderStatusHeader from "./OrderStatusHeader"
import OrderStatusDetails from "./OrderStatusDetails"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"

type Props = {
    order: Order
}

const MyOrderCard = ({ order }: Props) => {
    return (
        <div key={order._id} className="space-y-10 bg-gray-50 p-10 rounded-lg">
            <OrderStatusHeader order={order} />
            <div className="grid gap-10 md:grid-cols-2">
                <OrderStatusDetails order={order} />
                <AspectRatio ratio={16 / 5}>
                    <img
                        src={order.restaurant.imageUrl}
                        className="rounded-md object-cover h-full w-full"
                        alt="restaurant-image"
                    />
                </AspectRatio>
            </div>
        </div>
    )
}

export default MyOrderCard