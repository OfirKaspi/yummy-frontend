import { MenuItem, CartItem } from "@/types"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { Plus } from "lucide-react"


type Props = {
    cartItems: CartItem[]
    menuItems: MenuItem[]
    addToCart: (menuItem: MenuItem) => void
}

const RestaurantDetailsMenuItemsListMobile = ({ menuItems, cartItems, addToCart }: Props) => {
    return (
        <div className="grid grid-cols-2 gap-5">
            {menuItems.map((menuItem) => {
                const cartItem = cartItems.find(item => item._id === menuItem._id);
                const quantity = cartItem ? cartItem.quantity : 0; // Get the quantity or default to 0

                return (
                    <div key={menuItem._id} className="relative flex flex-col rounded-xl shadow-lg p-3 gap-1 bg-white">
                        {quantity > 0 && (
                            <div className="absolute top-0 left-0 rounded-tl-xl
                                border-t-[75px] border-t-green-600
                                border-r-[75px] border-r-transparent"
                            />
                        )}

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

export default RestaurantDetailsMenuItemsListMobile
