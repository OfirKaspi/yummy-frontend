import { ShoppingBag } from "lucide-react"

type Props = {
    totalQuantity?: number
}

const ShoppingBagCmp = ({ totalQuantity = 3 }: Props) => {
    return (
        <div className="ml-auto flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 relative text-white">
            <div className="relative">
                <ShoppingBag />
                <span className="absolute bottom-4 left-4 w-7 h-7 flex items-center justify-center font-medium bg-orange-500 rounded-full">
                    {totalQuantity}
                </span>
            </div>
        </div>
    )
}

export default ShoppingBagCmp