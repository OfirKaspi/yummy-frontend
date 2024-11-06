import { MenuItem, CartItem } from "@/types"
import { Minus, Plus, Trash } from "lucide-react"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"


type Props = {
    cartItems: CartItem[]
    menuItems: MenuItem[]
    addToCart: (menuItem: MenuItem) => void
    adjustItemQuantity: (cartItem: CartItem, newQuantity: number) => void
    removeFromCart: (cartItem: CartItem) => void
}

const RestaurantDetailsMenuItemsList = ({ menuItems, cartItems, addToCart, adjustItemQuantity, removeFromCart }: Props) => {
    const [openItemId, setOpenItemId] = useState<string | null>(null)

    const handleRemoveFromCart = (cartItem: CartItem) => {
        removeFromCart(cartItem)
        setOpenItemId(null)
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-5 gap-5">
            {menuItems.map((menuItem) => {
                const cartItem = cartItems.find(item => item._id === menuItem._id) || { ...menuItem, quantity: 0 }
                const quantity = cartItem ? cartItem.quantity : 0
                const isInCart = (quantity > 0) ? "border-green-500" : ""

                return (
                    <Dialog key={menuItem._id} open={openItemId === menuItem._id} onOpenChange={(isOpen) => setOpenItemId(isOpen ? menuItem._id : null)}>
                        <DialogTrigger>
                            <div className={`relative flex flex-col items-start cursor-pointer rounded-xl p-3 gap-1 bg-white border-2 ${isInCart} `}>
                                <AspectRatio ratio={5 / 3}>
                                    <img
                                        src="https://www.announcementconverters.com/media/catalog/product/S/-/S-ILG11F_9.JPG"
                                        alt={menuItem.name}
                                        className="object-cover w-full h-full rounded-xl"
                                    />
                                </AspectRatio>
                                <span className="font-medium">{menuItem.name}</span>
                                <div className="flex justify-between w-full">
                                    <span>${(menuItem.price / 100).toFixed(2)}</span>
                                    <Plus className="rounded-full bg-orange-500 text-white p-1" />
                                </div>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="gap-5 p-5 w-[300px] rounded-lg md:w-[400px] ">
                            <DialogTitle className="text-lg font-semibold">{menuItem.name}</DialogTitle>
                            <Separator />
                            <section className="flex flex-col gap-5">
                                <div className="flex items-center gap-2">
                                    <Button
                                        className="bg-green-500 hover:bg-green-400"

                                        onClick={isInCart ? () => adjustItemQuantity(cartItem, quantity + 1) : () => addToCart(menuItem)}
                                    >
                                        <Plus
                                            className="cursor-pointer"
                                            size={20}
                                        />
                                    </Button>
                                    <Badge variant="outline" className="h-9 w-14 flex justify-center text-gray-600 text-md">
                                        {quantity}
                                    </Badge>
                                    {isInCart && (
                                        <Button
                                            variant={"destructive"}
                                            onClick={() => adjustItemQuantity(cartItem, quantity - 1)}
                                        >
                                            <Minus
                                                className="cursor-pointer"
                                                size={20}
                                            />
                                        </Button>
                                    )}
                                </div>
                                <div className="flex flex-col text-gray-600 text-sm">
                                    <span>Dish price: ${(menuItem.price / 100).toFixed(2)}</span>
                                    <span>Total: ${((menuItem.price * quantity) / 100).toFixed(2)} (${(menuItem.price / 100).toFixed(2)} x {quantity})</span>
                                </div>
                                {isInCart && (
                                    <Button
                                        variant="destructive"
                                        className="space-x-2"
                                        onClick={() => handleRemoveFromCart(cartItem)}
                                    >
                                        <span>Remove from cart</span>
                                        <Trash size={20} />
                                    </Button>
                                )}
                            </section>
                        </DialogContent>
                    </Dialog>)
            })}
        </div>
    )
}

export default RestaurantDetailsMenuItemsList
