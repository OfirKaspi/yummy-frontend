import { MenuItem, CartItem } from "@/types"
import { Plus } from "lucide-react"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"


type Props = {
    cartItems: CartItem[]
    menuItems: MenuItem[]
    addToCart: (menuItem: MenuItem) => void
}

const RestaurantDetailsMenuItemsList = ({ menuItems, cartItems, addToCart }: Props) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-5 gap-5">
            {menuItems.map((menuItem) => {
                const cartItem = cartItems.find(item => item._id === menuItem._id)
                const quantity = cartItem ? cartItem.quantity : 0
                const inCart = (quantity > 0) ? "border-green-500" : ""

                return (
                    <div key={menuItem._id} className={`relative flex flex-col rounded-xl p-3 gap-1 bg-white border-2 ${inCart} `}>
                        <AspectRatio ratio={5 / 3}>
                            <img
                                src="https://www.announcementconverters.com/media/catalog/product/S/-/S-ILG11F_9.JPG"
                                alt={menuItem.name}
                                className="object-cover w-full h-full rounded-xl"
                            />
                        </AspectRatio>
                        <span className="font-medium">{menuItem.name}</span>
                        <div className="flex justify-between items-center">
                            <span>${(menuItem.price / 100).toFixed(2)}</span>
                            <span
                                className="flex items-center justify-center rounded-full bg-orange-500 text-white w-7 h-7 cursor-pointer"
                                onClick={() => addToCart(menuItem)}
                            >
                                <Plus size={16} />
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default RestaurantDetailsMenuItemsList
