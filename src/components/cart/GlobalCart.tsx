import { useEffect, useState, useMemo } from "react"
import { Restaurant } from "@/types"
import { getRestaurantById } from "@/api/restaurantAPI"
import { loadCartsFromStorage } from "@/utils/cartSessionStorage"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import ShoppingCartCmp from "@/components/ShoppingCartCmp"
import { Separator } from "@/components/ui/separator"
import NotFound from "@/components/NotFound"
import GlobalCartItem from "@/components/cart/GlobalCartItem"
import useDeviceType from "@/hooks/useDeviceType"

const GlobalCart = () => {
    const { isMobile } = useDeviceType()
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
                <ShoppingCartCmp totalQuantity={totalQuantity} />
            </SheetTrigger>
            <SheetContent side={isMobile ? "bottom" : "left"} className="space-y-5 overflow-y-auto max-h-[500px] rounded-t-3xl md:max-h-full md:rounded-none">
                <SheetTitle className="text-2xl font-normal">Open Carts</SheetTitle>
                <Separator />
                {
                    restaurantDetails.length > 0
                        ? (
                            restaurantDetails.map((restaurant) => {
                                const cart = carts.find(c => c.restaurantId === restaurant._id)
                                if (!cart) return null

                                return (
                                    <GlobalCartItem key={restaurant._id} restaurant={restaurant} cart={cart} />
                                )
                            }))
                        : <NotFound itemNotFound="Carts" />
                }
            </SheetContent>
        </Sheet>
    )
}

export default GlobalCart
