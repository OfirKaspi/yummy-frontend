import { Order } from "@/types"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"

type Props = {
    order: Order
}

const TrackOrder = ({ order }: Props) => {
    return (
        <Sheet>
            <SheetTrigger className="bg-orange-500 rounded-lg text-white font-medium text-xs py-2">
                Track Order
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl">
                {/* OrderDetailsPage */}
                to be continue
            </SheetContent>
        </Sheet>
    )
}

export default TrackOrder