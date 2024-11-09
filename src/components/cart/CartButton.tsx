import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
    totalQuantity?: number
}

const CartButton = ({ totalQuantity = 0 }: Props) => {
    return (
        <Button className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 dark:bg-cyan-700 relative text-white">
            <div className="relative">
                <ShoppingCart />
                {totalQuantity > 0 &&
                    <span className="absolute bottom-4 left-4 w-7 h-7 flex items-center justify-center font-medium bg-orange-500 rounded-full">
                        {totalQuantity}
                    </span>
                }
            </div>
        </Button>
    )
}

export default CartButton