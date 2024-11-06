import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Restaurant, CartItem } from "@/types"
import { UserFormData } from "@/forms/user-profile-form/UserDetailsOrderForm"
import OrderSummary from "@/components/order/OrderSummary"
import CheckoutButton from "@/components/order/CheckoutButton"
import ShoppingCartCmp from "@/components/ShoppingCartCmp"
import useScrollPosition from "@/hooks/useScrollPosition"
import { Button } from "../ui/button"

type Props = {
    restaurant: Restaurant
    cartItems: CartItem[]
    isCheckoutLoading: boolean
    onCheckout: (userFormData: UserFormData) => void
    adjustItemQuantity: (cartItem: CartItem, newQuantity: number) => void
    removeFromCart: (cartItem: CartItem) => void
}

const RestaurantDetailsOrderSheet = ({
    restaurant,
    cartItems,
    isCheckoutLoading,
    onCheckout,
    adjustItemQuantity,
    removeFromCart,
}: Props) => {
    const isAtBottom = useScrollPosition()

    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)

    return (
        <Sheet>
            <SheetTrigger asChild className={`fixed bottom-5 right-5 z-50 h-12 curp ${isAtBottom ? 'w-[calc(100%-2rem)]' : 'w-12'}`}>
                <Button
                    className="flex items-center justify-center bg-slate-900 text-white transition-all duration-300 rounded-full hover:bg-primary"
                >
                    <ShoppingCartCmp totalQuantity={totalQuantity} />
                    {isAtBottom && <span className={`${totalQuantity > 0 && 'ml-2'} font-medium`}>Go to check out</span>}
                </Button>
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

export default RestaurantDetailsOrderSheet
