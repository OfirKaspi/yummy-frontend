import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CartItem } from "@/pages/restaurantDetailsPage/RestaurantDetailsPage"
import { Restaurant } from "@/types"
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm"
import OrderSummary from "@/components/order/OrderSummary"
import CheckoutButton from "@/components/order/CheckoutButton"
import ShoppingBagCmp from "@/components/ShoppingBagCmp"
import { useState, useEffect } from "react"

type Props = {
    restaurant: Restaurant
    cartItems: CartItem[]
    isCheckoutLoading: boolean
    onCheckout: (userFormData: UserFormData) => void
    adjustItemQuantity: (cartItem: CartItem, newQuantity: number) => void
    removeFromCart: (cartItem: CartItem) => void
}

const RestaurantDetailsOrderSheetMobile = ({
    restaurant,
    cartItems,
    isCheckoutLoading,
    onCheckout,
    adjustItemQuantity,
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

    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)

    return (
        <Sheet>
            <SheetTrigger asChild className="fixed bottom-5 right-5 z-50">
                <div
                    className={`flex items-center justify-center h-12
                        ${isAtBottom ? 'w-[calc(100%-2rem)]' : 'w-12'} 
                        bg-slate-900 text-white transition-all duration-300 rounded-full`}
                >
                    <ShoppingBagCmp totalQuantity={totalQuantity} />
                    {isAtBottom && <span className="ml-5 font-bold">Go to check out</span>}
                </div>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl">
                <OrderSummary
                    restaurant={restaurant}
                    cartItems={cartItems}
                    removeFromCart={removeFromCart}
                    adjustItemQuantity={adjustItemQuantity}
                />
                <div className="px-6">
                    <CheckoutButton
                        disabled={cartItems.length === 0}
                        onCheckout={onCheckout}
                        isLoading={isCheckoutLoading}
                    />
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default RestaurantDetailsOrderSheetMobile
