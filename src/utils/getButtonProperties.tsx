import { RefreshCw, ShoppingCart, Trash } from "lucide-react"

export const getButtonProperties = (initialQuantity: number, tempQuantity: number) => {
    switch (true) {
        case initialQuantity === 0 && tempQuantity === 0:
            return { buttonText: "Item quantity didn't change...", buttonStyle: "bg-gray-500 hover:bg-gray-400", buttonIcon: null, isButtonDisabled: true }
        case initialQuantity === 0 && tempQuantity > 0:
            return {
                buttonText: "Add to Cart", buttonStyle: "bg-green-500 hover:bg-green-400", buttonIcon: <ShoppingCart size={20} />, isButtonDisabled: false
            }
        case initialQuantity > 0 && tempQuantity === 0:
            return { buttonText: "Remove from Cart", buttonStyle: "", buttonIcon: <Trash size={20} />, isButtonDisabled: false }
        case initialQuantity > 0 && tempQuantity === initialQuantity:
            return { buttonText: "Item quantity didn't change...", buttonStyle: "bg-gray-500 hover:bg-gray-400", buttonIcon: null, isButtonDisabled: true }
        case initialQuantity > 0 && tempQuantity !== initialQuantity:
            return { buttonText: "Update Cart", buttonStyle: "bg-orange-500 hover:bg-orange-400", buttonIcon: <RefreshCw size={20} />, isButtonDisabled: false }
        default:
            return { buttonText: "", buttonStyle: "bg-gray-500 hover:bg-gray-400", buttonIcon: null, isButtonDisabled: false }
    }
}