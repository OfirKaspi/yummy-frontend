import { useState } from "react"
import { Minus, Plus, Trash } from "lucide-react"
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { getButtonProperties } from "@/utils/getButtonProperties"
import { showToast } from "@/utils/showToast"
import { MenuItem, CartItem } from "@/types"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SkeletonCard } from "@/components/ui/skeleton"

type Props = {
    cartItems: CartItem[]
    menuItems?: MenuItem[]
    handleCartAction: (cartItem: CartItem, action: "add" | "update" | "remove") => void
}

const RestaurantDetailsMenuItemsList = ({ menuItems, cartItems, handleCartAction }: Props) => {
    const [tempQuantity, setTempQuantity] = useState(0)
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

    const openDialog = (item: MenuItem) => {
        const cartItem = cartItems.find(i => i._id === item._id)
        setTempQuantity(cartItem ? cartItem.quantity : 0)
        setSelectedItem(item)
    }

    const closeDialog = () => setSelectedItem(null)

    const handleMainAction = () => {
        if (!selectedItem) return
        const cartItem = { ...selectedItem, quantity: tempQuantity }
        const action = cartItems.some(i => i._id === selectedItem._id) ? "update" : "add"
        handleCartAction(cartItem, action)
        closeDialog()
        showToast(`${cartItem.name} ${action === "update" ? "dishes quantity updated" : "added to cart"}`, "success")
    }

    const handleRemoveFromCart = (cartItem: CartItem) => {
        handleCartAction(cartItem, "remove")
        closeDialog()
        showToast(`${cartItem.name} removed from cart`, "success")
    }

    const updateTempQuantity = (amount: number) => setTempQuantity(prev => Math.max(0, prev + amount))

    if (!menuItems) {
        return <SkeletonCard />
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-5 gap-5">
            {menuItems.map((menuItem) => {
                const cartItem = cartItems.find(item => item._id === menuItem._id)
                const initialQuantity = cartItem ? cartItem.quantity : 0
                const isSelected = initialQuantity > 0

                const { buttonText, buttonStyle, buttonIcon, isButtonDisabled } = getButtonProperties(initialQuantity, tempQuantity)
                const showMainButton = buttonText !== "Remove from cart" && tempQuantity !== 0
                const showRemoveButton = initialQuantity > 0 && cartItem

                return (
                    <Dialog key={menuItem._id} open={selectedItem?._id === menuItem._id} onOpenChange={(isOpen) => setSelectedItem(isOpen ? menuItem : null)}>
                        <DialogTrigger asChild>
                            <div
                                onClick={() => openDialog(menuItem)}
                                className={`relative flex flex-col items-start cursor-pointer rounded-xl p-3 gap-1 border-2 ${isSelected ? 'border-green-500' : ''}`}
                            >
                                <AspectRatio ratio={5 / 3}>
                                    <img src={menuItem.imageUrl} alt={`${menuItem.name}-img`} className="object-cover w-full h-full rounded-xl" />
                                </AspectRatio>
                                <span className="font-medium">{menuItem.name}</span>
                                <div className="flex justify-between w-full">
                                    <span>${(menuItem.price / 100).toFixed()}</span>
                                    <Plus className="rounded-full bg-orange-500 text-white p-1" />
                                </div>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="gap-5 p-5 w-[300px] rounded-lg md:w-[400px]">
                            <DialogTitle className="text-lg font-semibold">{menuItem.name}</DialogTitle>
                            <Separator />
                            <section className="flex flex-col gap-5">
                                <div className="flex items-center gap-2">
                                    <Button className="bg-green-500 hover:bg-green-400" onClick={() => updateTempQuantity(1)}>
                                        <Plus size={20} />
                                    </Button>
                                    <Badge variant="outline" className="h-9 w-14 flex justify-center text-gray-600 text-md">
                                        {tempQuantity}
                                    </Badge>
                                    <Button variant="destructive" onClick={() => updateTempQuantity(-1)}>
                                        <Minus size={20} />
                                    </Button>
                                </div>
                                <div className="flex flex-col text-muted-foreground text-sm">
                                    <span>Dish price: ${(menuItem.price / 100).toFixed(2)}</span>
                                    <span>Total: ${((menuItem.price * tempQuantity) / 100).toFixed(2)} (${(menuItem.price / 100).toFixed(2)} x {tempQuantity})</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {showMainButton &&
                                        <Button
                                            className={`space-x-2 ${buttonStyle} text-white`}
                                            onClick={handleMainAction}
                                            disabled={isButtonDisabled}
                                        >
                                            {buttonIcon}
                                            <span>{buttonText}</span>
                                        </Button>
                                    }
                                    {showRemoveButton &&
                                        < Button
                                            variant="destructive"
                                            className="space-x-2"
                                            onClick={() => handleRemoveFromCart(cartItem)}
                                        >
                                            <Trash size={20} />
                                            <span>Remove from cart</span>
                                        </Button>
                                    }
                                </div>
                            </section>
                        </DialogContent>
                    </Dialog>
                )
            })}
        </div >
    )
}

export default RestaurantDetailsMenuItemsList
