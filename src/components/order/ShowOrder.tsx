import { Order } from "@/types"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import OrderStatusDetails from "@/components/order/OrderStatusDetails"

type Props = {
    order: Order
}

const ShowOrder = ({ order }: Props) => {
    return (
        <Sheet>
            <SheetTrigger className="bg-orange-500 rounded-lg text-white font-medium text-xs py-2">
                Show Order
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl">
                <OrderStatusDetails order={order} />
            </SheetContent>
        </Sheet>
    )
}

export default ShowOrder