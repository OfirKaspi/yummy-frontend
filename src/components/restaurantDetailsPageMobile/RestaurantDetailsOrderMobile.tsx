import { Sheet, ShoppingBag } from "lucide-react"
import { SheetContent, SheetTrigger } from "../ui/sheet"
import OrderSummary from "../OrderSummary"
import { CardFooter } from "../ui/card"
import CheckoutButton from "../CheckoutButton"
import { CartItem } from "@/pages/restaurantDetailsPage/RestaurantDetailsPage"
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm"
import { useEffect, useState } from "react"
import { Restaurant } from "@/types"

type Props = {
    restaurant: Restaurant
    cartItems: CartItem[]
    onCheckout: (userFormData: UserFormData) => void
    isCheckoutLoading: boolean
    adjustItemQuantity: (cartItem: CartItem, newQuantity: number) => void
    removeFromCart: (cartItem: CartItem) => void
}

const RestaurantDetailsOrderMobile = ({
    restaurant,
    adjustItemQuantity,
    cartItems,
    isCheckoutLoading,
    onCheckout,
    removeFromCart,
}: Props) => {
    const [isAtBottom, setIsAtBottom] = useState(false)

    const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight
        const windowHeight = document.documentElement.scrollHeight

        if (scrollPosition >= windowHeight - 50) {
            setIsAtBottom(true)
        } else {
            setIsAtBottom(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <Sheet>
            <SheetTrigger asChild className={`fixed bottom-5 right-5 z-50`}>
                <div
                    className={`flex items-center justify-center 
                                ${isAtBottom ? 'w-[calc(100%-2rem)] h-16' : 'w-12 h-12'} 
                                bg-slate-900 text-white transition-all duration-300 rounded-full`}
                >
                    {isAtBottom ? (
                        <>
                            <div className="relative">
                                <span className="absolute bottom-3 left-3 w-7 h-7 flex items-center justify-center font-medium bg-orange-500 rounded-full">
                                    3
                                </span>
                                <ShoppingBag />
                            </div>
                            <span className="ml-5 font-bold">Go to check out</span>
                        </>
                    ) : (
                        <>
                            <ShoppingBag />
                            <span className="absolute bottom-6 left-6 w-7 h-7 flex items-center justify-center font-medium bg-orange-500 rounded-full">
                                3
                            </span>
                        </>
                    )}
                </div>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl">
                <div>
                    <OrderSummary
                        restaurant={restaurant}
                        cartItems={cartItems}
                        removeFromCart={removeFromCart}
                        adjustItemQuantity={adjustItemQuantity}
                    />
                    <CardFooter>
                        <CheckoutButton
                            disabled={cartItems.length === 0}
                            onCheckout={onCheckout}
                            isLoading={isCheckoutLoading}
                        />
                    </CardFooter>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default RestaurantDetailsOrderMobile