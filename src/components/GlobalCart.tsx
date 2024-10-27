import { useEffect, useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { Restaurant } from "@/types"
import { getRestaurantById } from "@/api/restaurantAPI"
import { loadCartsFromStorage } from "@/utils/cartSessionStorage"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ShoppingBagCmp from "@/components/ShoppingBagCmp"
import { Separator } from "@/components/ui/separator"

const GlobalCart = () => {
    const carts = loadCartsFromStorage()

    const restaurantIds = useMemo(() => [...new Set(carts.map(cart => cart.restaurantId))], [carts])

    const [restaurantDetails, setRestaurantDetails] = useState<Restaurant[]>([])
    const totalQuantity = carts.reduce((acc, cart) => {
        const cartQuantity = cart.cartItems.reduce((sum, item) => sum + item.quantity, 0)
        return acc + cartQuantity
    }, 0)


    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            try {
                const responses = await Promise.all(
                    restaurantIds.map(id => getRestaurantById(id))
                )
                setRestaurantDetails(responses)
            } catch (error) {
                console.error("Error fetching restaurant details:", error)
            }
        }

        if (restaurantIds.length > 0) {
            fetchRestaurantDetails()
        }
    }, [restaurantIds])

    return (
        <Sheet>
            <SheetTrigger>
                <ShoppingBagCmp totalQuantity={totalQuantity} />
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl max-h-[500px] space-y-5 overflow-y-auto">
                <span className="text-2xl">Open Carts</span>
                <Separator />
                {restaurantDetails.map((restaurant, index) => {
                    const cart = carts.find(c => c.restaurantId === restaurant._id)
                    if (!cart) {
                        return null
                    }
                    return (
                        <>
                            {index !== 0 && <Separator />}
                            <div key={restaurant._id} className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={restaurant.imageUrl}
                                        alt={restaurant.restaurantName}
                                        className="object-cover w-20 h-20 rounded-xl"
                                    />
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-lg">{restaurant.restaurantName}</span>
                                            <span className="text-gray-600 text-xs">
                                                {cart.cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-gray-600">
                                            <span>
                                                Total: $
                                                {(
                                                    cart.cartItems.reduce((total, item) => total + (item.price * item.quantity) / 100, 0) +
                                                    (restaurant.deliveryPrice / 100)
                                                ).toFixed(2)}
                                            </span>
                                            <Link to={`/details/${restaurant._id}`} className="text-orange-500 underline">
                                                View Restaurant
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </SheetContent>
        </Sheet>
    )
}

export default GlobalCart
