import { MenuItem } from "@/types"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { Plus } from "lucide-react"

type Props = {
    menuItems: MenuItem[]
    addToCart: (menuItem: MenuItem) => void
}

const RestaurantDetailsMenuItemsListMobile = ({ menuItems, addToCart }: Props) => {
    return (
        <div className="grid grid-cols-2 gap-5">
            {menuItems.map((menuItem) => (
                <div key={menuItem._id} className="flex flex-col rounded-xl shadow-lg p-3 gap-1">
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
                            className="flex items-center justify-center rounded-full bg-orange-500 text-white w-7 h-7"
                            onClick={() => addToCart(menuItem)}
                        >
                            <Plus size={16} />
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RestaurantDetailsMenuItemsListMobile